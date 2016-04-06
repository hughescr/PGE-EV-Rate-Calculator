'use strict';

// PG&E is all in CA, so always in Pacific timezone
let moment = require('moment-timezone');
moment.tz('America/Los_Angeles');

let expat  = require('node-expat');

let pge_data = require('./data');

let day_lookup = {};
for(let i = 0; i < 7; i++)
{
    day_lookup[moment().day(i).format('dddd')] = i || 7;
}

let month_lookup = {};
for(let i = 0; i < 12; i++)
{
    month_lookup[moment().month(i).format('MMMM')] = i;
}

/**************************************
 * Date-time boundary check functions *
 **************************************/

function checkCalendarDate(some_date, start_date, end_date)
{
    let checkMonth = some_date.month();
    let checkDate = some_date.date();

    let after_start = (checkMonth > month_lookup[start_date.month]) ||
                      (checkMonth == month_lookup[start_date.month] && checkDate >= start_date.day);
    let before_end = (checkMonth < month_lookup[end_date.month]) ||
                     (checkMonth == month_lookup[end_date.month] && checkDate <= end_date.day);

    return after_start && before_end;
}

function checkDayOfWeek(some_date, start_day, end_day)
{
    let checkDay = some_date.day() || 7; // Call sunday 7 instead of 1

    return (checkDay >= day_lookup[start_day] &&
            checkDay <= day_lookup[end_day]);
}

function checkTimeOfDay(some_date, start_time, end_time)
{
    let checkHour = some_date.hour();

    return (checkHour >= start_time && checkHour < end_time);
}

// For some given rate plan, and a date/time, return the rate operating in that time -- {Summer,Winter} [{Off,Partial} ]Peak
function convertToRate(some_plan, some_date)
{
    for(let i = 0; i < some_plan.schedule.length; i++)
    {
        let condition = some_plan.schedule[i];

        // If there's no start period, then we match by default as we've reached the end
        if(!condition.start_cal)
        {
            return condition.type;
        }

        // We are in this calendar period
        if(checkCalendarDate(some_date, condition.start_cal, condition.end_cal))
        {
            // If there's no start day, then we match by default as we've reached the end of this calendar chunk
            if(!condition.start_day)
            {
                return condition.type;
            }

            // Check day of week
            if(checkDayOfWeek(some_date, condition.start_day, condition.end_day))
            {
                // Check time of day
                if(checkTimeOfDay(some_date, condition.start_time, condition.end_time))
                {
                    return condition.type;
                }
            }
        }
    }
}

// Given some rate plan and rate in that plan, and the accumulated use so far in this period, and a time, return the price per kWh of the next kWh
function convertToPrice(some_plan, some_rate, accumulated, time, allElectric, baselineTerritory)
{
    let baseline = 1;
    if(some_plan.baselines)
    {
        let daysThisMonth = time.daysInMonth(); // Last day of the month
        // Figure out what tier we're in
        baseline = some_plan.baselines[allElectric ? 'code_h' : 'code_b'][baselineTerritory][some_rate.split(' ')[0]] * daysThisMonth;
    }

    let price_list = some_plan.prices[some_rate];

    // Now iterate through rates to find where we fall
    let i;
    for(i = 0; i < price_list.length; i++)
    {
        if(!price_list[i].end ||
            accumulated <= (baseline * price_list[i].end))
        {
            return price_list[i].rate / 100000;
        }
    }
}

// Create an object which can create 2 parsers: one for summary data and one for detail data
// Each parser will call back when it completes.
exports.PGEParser = function(allElectric, baselineTerritory, wHPerMile, milesPerDay, addMilesUntilDate)
{
    let billing_periods = [];

    let totals = {
        Bill: {
            Total: { cost: 0, numDays: 0, amount: 0 },
        },
        // In here will be objects like:
        // e6 : { 'Summer': { cost: 123, numDays: 123}, 'Winter': {cost: 123, numDays: 123}, 'Total': {cost: 246, numDays: 123} }, ...
    };

    for(let rateName in pge_data.rates)
    {
        totals[rateName] = {};
        for(let periodName in pge_data.rates[rateName].prices)
        {
            totals[rateName][periodName.split(' ')[0]] = { cost: 0, numDays: 0, amount: 0 };
        }
        totals[rateName].Total = { cost: 0, numDays: 0, amount: 0 };
    }

    this.summaryParser = function(on_completed)
    {
        let in_intervalreading = false;
        let in_start = false;
        let currentStart = '';

        let bill_parser = new expat.Parser('UTF-8');

        bill_parser.on('startElement', function(name, attrs)
        {
            if(name == 'IntervalReading')
            {
                in_intervalreading = true;
            }

            if(in_intervalreading && name == 'start')
            {
                in_start = true;
                currentStart = '';
            }
        });

        bill_parser.on('endElement', function(name)
        {
            if(name == 'feed')
            {
                return on_completed();
            }

            if(name == 'IntervalReading')
            {
                in_intervalreading = false;
            }

            if(in_intervalreading && name == 'start')
            {
                let date = moment.unix(currentStart);
                billing_periods.push(date);
                in_start = false;
            }
        });

        bill_parser.on('text', function(text)
        {
            if(in_intervalreading && in_start)
            {
                currentStart = currentStart + text;
            }
        });

        bill_parser.on('error', function(err)
        {
            console.error('Error:', err.stack);
        });

        return bill_parser;
    };

    this.detailsParser = function(on_completed)
    {
        /* These variables track state during parsing */
        let currentDay = 0;
        let currentMonth = 0;
        let nextBill = 0;
        let currentMonthJuice = 0;
        let currentStart = '';
        let currentDuration = '';
        let currentCost = '';
        let currentValue = '';
        let in_duration = false;
        let in_start = false;
        let in_cost = false;
        let in_value = false;

        let detail_parser = new expat.Parser('UTF-8');

        detail_parser.on('startElement', function(name, attr)
        {
            if(name == 'duration')
            {
                  currentDuration = '';
                  in_duration = true;
            }
            else if(name == 'cost')
            {
                  currentCost = '';
                  in_cost = true;
            }
            else if(name == 'start')
            {
                  currentStart = '';
                  in_start = true;
            }
            else if(name == 'value')
            {
                  currentValue = '';
                  in_value = true;
            }
        });

        detail_parser.on('endElement', function(name)
        {
            if(name == 'IntervalReading')
            {
                if(!billing_periods.length)
                {
                    if(currentStart.month() != currentMonth)
                    {
                        currentMonth = currentStart.month();
                        currentMonthJuice = 0;
                    }
                }
                else
                {
                    if(nextBill < billing_periods.length && currentStart.isSameOrAfter(billing_periods[nextBill]))
                    {
                        nextBill++;
                        currentMonthJuice = 0;
                    }
                }

                // At start of every day, add off-peak car charging
                if(currentStart.dayOfYear() != currentDay)
                {
                    currentDay = currentStart.dayOfYear();

                    let milesToday = 0;
                    if(!addMilesUntilDate || currentStart.isBefore(addMilesUntilDate))
                    {
                        milesToday = milesPerDay;
                    }

                    let extraJuice = milesToday * wHPerMile;

                    // Track this for baseline
                    currentMonthJuice += extraJuice;

                    // Assume car charging is at start of day (ie off-peak midnight)
                    let time = currentStart.clone().startOf('day');

                    totals.Bill.Total.numDays++;
                    for(let rateName in pge_data.rates)
                    {
                        let rate = pge_data.rates[rateName];
                        let type = convertToRate(rate, time);
                        let cost = convertToPrice(rate, type, currentMonthJuice, time, allElectric, baselineTerritory) * extraJuice;

                        totals[rateName][type.split(' ')[0]].cost += cost;
                        totals[rateName][type.split(' ')[0]].numDays++;
                        totals[rateName][type.split(' ')[0]].amount += extraJuice;

                        totals[rateName].Total.cost += cost;
                        totals[rateName].Total.numDays++;
                        totals[rateName].Total.amount += extraJuice;
                    }
                }

                // Now add the current interval's usage
                currentMonthJuice += currentValue;

                totals.Bill.Total.cost   += currentCost;
                totals.Bill.Total.amount += currentValue;
                for(let rateName in pge_data.rates)
                {
                    let rate = pge_data.rates[rateName];
                    let type = convertToRate(rate, currentStart);
                    let cost = convertToPrice(rate, type, currentMonthJuice, currentStart, allElectric, baselineTerritory) * currentValue;

                    totals[rateName][type.split(' ')[0]].cost += cost;
                    totals[rateName][type.split(' ')[0]].amount += currentValue;

                    totals[rateName].Total.cost += cost;
                    totals[rateName].Total.amount += currentValue;
                }
            }
            else if(name == 'duration')
            {
                in_duration = false;
                currentDuration = parseInt(currentDuration);
            }
            else if(name == 'cost')
            {
                in_cost = false;
                currentCost = parseInt(currentCost) / 100000;
            }
            else if(name == 'start')
            {
                in_start = false;
                currentStart = moment.unix(currentStart);
            }
            else if(name == 'value')
            {
                in_value = false;
                currentValue = parseInt(currentValue) / 1000;
            }
            else if(name == 'feed')
            {
                on_completed(totals);
            }
        });

        detail_parser.on('text', function(text)
        {
            if(in_duration)
            {
                  currentDuration = currentDuration + text;
            }
            else if(in_cost)
            {
                  currentCost = currentCost + text;
            }
            else if(in_start)
            {
                  currentStart = currentStart + text;
            }
            else if(in_value)
            {
                  currentValue = currentValue + text;
            }
        });

        detail_parser.on('error', function(err)
        {
            console.error('Error:', err.stack);
        });

        return detail_parser;
    };

    return this;
};
