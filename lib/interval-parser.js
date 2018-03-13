'use strict';

const logger            = require('@hughescr/logger').logger;

const expat             = require('node-expat');
const _                 = require('underscore');
// PG&E is all in CA, so always in Pacific timezone
const moment            = require('moment-timezone');
moment.tz('America/Los_Angeles');

const pge_data          = require('@hughescr/pge-rates');
const pge_rates         = pge_data.rates;
const timePeriodForRateAndDate = pge_data.timePeriodForRateAndDate;

const blankTracker = function() {
    return Object.assign(
        { Bill: { Total: { cost: 0, amount: 0, numDays: 0 } } },
        _.mapObject(pge_rates, rate => {
            const periodNames = _.keys(rate.prices);

            const periodTracker = Object.assign(
                { Total: { cost: 0, amount: 0, numDays: 0 } },
                _.object(_.map(periodNames, periodName => [periodName, { cost: 0, amount: 0, numDays: 0 }]))
            );

            return periodTracker;
        })
    );
};

module.exports = function(stream, billing_periods, allElectric, baselineTerritory) {
    const totals = blankTracker();

    return new Promise((resolve, reject) => {
        const detail_parser = new expat.Parser('UTF-8');

        // The billing period we're currently handling; undefined if period has ended or not yet started
        let currentPeriod;

        // The current day that we are filling with data
        let currentDay;

        const endBill = function() {
            // Add up totals for all the rates
            _.chain(totals)
            .omit('Bill')
            .forEach((periods) => {
                _.chain(periods)
                .omit('Total')
                .forEach((data) => {
                    periods.Total.cost   += data.cost;
                    periods.Total.amount += data.amount;
                });
            });
        };

        const startBillingPeriod = function(startDate) {
            if(billing_periods.length) {
                currentPeriod = _.find(billing_periods,
                    period => startDate.isSameOrAfter(period.start) && startDate.isBefore(period.start.clone().add(period.duration)));
            } else {
                currentPeriod = { start: startDate.clone().startOf('month'), duration: moment.duration(startDate.daysInMonth(), 'days') };
            }

            if(currentPeriod && !startDate.isSame(currentPeriod.start)) {
                logger.warn(`Starting period not aligned with billing start period; bill starts on ${currentPeriod.start.format()} with duration ${currentPeriod.duration.asDays()} days; Detail starts on ${startDate.format()}`);
            }

            if(!currentPeriod) {
                logger.warn(`${startDate.format()} is past the end of summary data; will add-hoc it with ${startDate.daysInMonth()} days`);
                currentPeriod = { start: startDate.clone().startOf('day'), duration: moment.duration(startDate.daysInMonth(), 'days') };
            }

            currentPeriod.days = [];
        };

        const endBillingPeriod = function() {
            const daysInBillingPeriod = Math.round(currentPeriod.duration.asDays());
            if(daysInBillingPeriod != currentPeriod.days.length) {
                logger.warn(`Did not get a complete period starting on ${currentPeriod.start.format()}; should have had ${currentPeriod.duration.asDays()} but had ${currentPeriod.days.length}`);
            }

            const totalUseInPeriod  = _.reduce(currentPeriod.days, (memo, day) => memo + day.Bill.Total.amount, 0);
            const totalCostInPeriod = _.reduce(currentPeriod.days, (memo, day) => memo + day.Bill.Total.cost,   0);

            totals.Bill.Total.amount  += totalUseInPeriod;
            totals.Bill.Total.cost    += totalCostInPeriod;
            totals.Bill.Total.numDays += currentPeriod.days.length;

            // Calculate for each rate, how much summer vs winter baseline in the billing period
            const seasonBaselineInBillingPeriodPerRate = _.reduce(currentPeriod.days, (memo, day) => {
                _.forEach(memo, (period, rate) => {
                    const todayIsSummerOrWinter = timePeriodForRateAndDate(pge_rates[rate], day.date).split(' ')[0];
                    period[todayIsSummerOrWinter].baseline += pge_data.baselines[allElectric ? 'code_h' : 'code_b'][baselineTerritory][todayIsSummerOrWinter] * 1000;
                    period[todayIsSummerOrWinter].amount   += _.reduce(day[rate], (memo, period) => memo + period.amount, 0);
                    period[todayIsSummerOrWinter].ratio = period[todayIsSummerOrWinter].amount / period[todayIsSummerOrWinter].baseline;
                });

                return memo;
            },
            _.mapObject(pge_rates, () => ({ Summer: { baseline: 0, amount: 0 }, Winter: { baseline: 0, amount: 0 } }))
            );

            logger.debug('season', seasonBaselineInBillingPeriodPerRate);

            currentPeriod.days.forEach(day => {
                _.chain(day)
                .omit('date', 'Bill')
                .forEach((periods, rate) => {
                    const alreadyTotalled = {};
                    _.chain(periods)
                    .omit('Total')
                    .forEach((data, period) => {
                        if(data.amount >= 0) {
                            if(!alreadyTotalled[rate]) {
                                alreadyTotalled[rate] = true;
                                totals[rate].Total.numDays++;
                            }

                            totals[rate][period].numDays++;
                            totals[rate][period].amount += data.amount;
                        }
                    });
                });
            });

            currentPeriod = undefined;
        };

        const startDay = function(date) {
            currentDay = Object.assign({ date: date }, blankTracker());
        };

        const endDay = function() {
            currentPeriod.days.push(currentDay);
            currentDay = undefined;
        };

        const endInterval = function(start, duration, cost, value) {
            if(!currentPeriod) {
                startBillingPeriod(start);
            }

            if(!currentDay) {
                startDay(start);
            }

            currentDay.Bill.Total.cost   += cost;
            currentDay.Bill.Total.amount += value;

            _.forEach(pge_rates, rate => {
                const type = timePeriodForRateAndDate(rate, start);

                currentDay[rate.name][type].amount += value;

                currentDay[rate.name].Total.amount += value;
            });

            const end_of_period = start.clone().add(duration);
            if(end_of_period.isAfter(currentDay.date.clone().endOf('day'))) {
                endDay();
            }

            if(end_of_period.isSameOrAfter(currentPeriod.start.clone().add(currentPeriod.duration))) {
                endBillingPeriod();
            }
        };

        // Accumulators for individual values
        let currentStart;
        let currentDuration;
        let currentCost;
        let currentValue;
        let in_start = false;
        let in_duration = false;
        let in_cost = false;
        let in_value = false;

        detail_parser.on('startElement', name => {
            if(name == 'start') {
                currentStart = '';
                in_start = true;
            } else if(name == 'duration') {
                currentDuration = '';
                in_duration = true;
            } else if(name == 'cost') {
                currentCost = '';
                in_cost = true;
            } else if(name == 'value') {
                currentValue = '';
                in_value = true;
            }
        });

        detail_parser.on('endElement', name => {
            if(name == 'IntervalReading') {
                // We finished an interval
                endInterval(currentStart, currentDuration, currentCost, currentValue);
            } else if(name == 'start') {
                in_start = false;
                currentStart = moment.unix(currentStart);
            } else if(name == 'duration') {
                in_duration = false;
                currentDuration = moment.duration(parseInt(currentDuration), 'seconds');
            } else if(name == 'cost') {
                in_cost = false;
                currentCost = parseInt(currentCost); // Cost in 1/1000 pennies
            } else if(name == 'value') {
                in_value = false;
                currentValue = parseInt(currentValue);
            } else if(name == 'feed') {
                if(currentDay) {
                    endDay();
                }

                if(currentPeriod) {
                    endBillingPeriod();
                }

                endBill();

                resolve(totals);
            }
        });

        detail_parser.on('text', text => {
            if(in_start) {
                  currentStart = currentStart + text;
            } else if(in_duration) {
                currentDuration = currentDuration + text;
            } else if(in_cost) {
                  currentCost = currentCost + text;
            } else if(in_value) {
                  currentValue = currentValue + text;
            }
        });

        detail_parser.on('error', err => {
            reject(err);
        });

        stream.pipe(detail_parser);
    });
};
