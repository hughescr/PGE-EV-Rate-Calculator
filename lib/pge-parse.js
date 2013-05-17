#!/usr/bin/env node

// PG&E is all in CA, so always in Pacific timezone
process.env.TZ = 'US/Pacific'

var xml = require('node-xml');
var util = require('util');
require('date-utils');

var pge_data = require('./data');

/**************************************
 * Date-time boundary check functions *
 **************************************/

function checkCalendarDate(some_date, start_date, end_date)
{
    var currentYear = some_date.getFullYear();
    var startDate = new Date(currentYear, Date.getMonthNumberFromName(start_date.month), start_date.day);
    var endDate = new Date(currentYear, Date.getMonthNumberFromName(end_date.month), end_date.day);
    endDate.addDays(1);

    return some_date.between(startDate, endDate);
}

function checkDayOfWeek(some_date, start_day, end_day)
{
    return (some_date.getDay() >= Date.getDayNumberFromName(start_day) &&
            some_date.getDay() <= Date.getDayNumberFromName(end_day));
}

function checkTimeOfDay(some_date, start_time, end_time)
{
    var startTime = some_date.clone().clearTime().addHours(start_time);
    var endTime = some_date.clone().clearTime().addHours(end_time);

    return some_date.between(startTime, endTime);
}

// For some given rate plan, and a date/time, return the rate operating in that time -- {Summer,Winter} [{Off,Partial} ]Peak
function convertToRate(some_plan, some_date)
{
    var i;
    for(i=0; i<some_plan.schedule.length; i++)
    {
        var condition = some_plan.schedule[i]

        // If there's no start period, then we match by default
        if(!(condition.start_cal))
        {
            return condition.type;
        }

        // We are in this calendar period
        if(checkCalendarDate(some_date, condition.start_cal, condition.end_cal))
        {
            // If there's no start day, then we match by default
            if(!(condition.start_day))
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
    var baseline = 1;
    if(some_plan.baselines)
    {
        var daysThisMonth = time.getDaysBetween(time.clone().addMonths(1));
        // Figure out what tier we're in
        baseline = some_plan.baselines[allElectric?'code_h':'code_b'][baselineTerritory][some_rate.split(' ')[0]] * daysThisMonth;
    }

    var price_list = some_plan.prices[some_rate];

    // Now iterate through rates to find where we fall
    var i;
    for(i=0; i<price_list.length; i++)
    {
        if(!price_list[i].end ||
            accumulated <= (baseline * price_list[i].end))
        {
            return price_list[i].rate;
        }
    }
}

// Create an object which can create 2 parsers: one for summary data and one for detail data
// Each parser will call back when it completes.
exports.PGEParser = function(allElectric, baselineTerritory, wHPerMile, milesPerDay, earliestDate, latestDate)
{
    var results = {};

    var billing_periods = [];

    var totals = {
        // In here will be objects like:
        // e6 : { 'Summer': { cost: 123, numDays: 123}, 'Winter': {cost: 123, numDays: 123}, 'Total': {cost: 246, numDays: 123} }, ...
    };

    for(var rateName in pge_data.rates)
    {
        totals[rateName] = {};
        for(var periodName in pge_data.rates[rateName].prices)
        {
            totals[rateName][periodName.split(' ')[0]] = { cost: 0, numDays: 0, amount: 0 };
        }
        totals[rateName]['Total'] = { cost: 0, numDays: 0, amount: 0 };
    }

    this.summaryParser = function(on_completed)
    {
        var in_intervalreading = false;
        var in_start = false;
        var currentStart = "";

        var bill_parser = new xml.SaxParser(function(cb)
        {
            cb.onStartElementNS(function(elem, attrs, prefix, uri, namespaces)
            {
                if(elem == "IntervalReading")
                {
                    in_intervalreading = true;
                }
                if(in_intervalreading && elem == "start")
                {
                    in_start = true;
                    currentStart = "";
                }
            });
            cb.onEndElementNS(function(elem, prefix, uri)
            {
                if(elem == "feed")
                {
                    on_completed();
                }
                if(elem == "IntervalReading")
                {
                    in_intervalreading = false;
                }
                if(in_intervalreading && elem == "start")
                {
                    var date = new Date(parseInt(currentStart)*1000)
                    billing_periods.push(date);
                    in_start = false;
                }
            });
            cb.onCharacters(function(chars)
            {
                if(in_intervalreading && in_start)
                {
                    currentStart = currentStart+chars;
                }
            });
        });

        return bill_parser;
    }

    this.detailsParser = function(on_completed)
    {
        /* These variables track state during parsing */
        var currentDay = 0;
        var currentMonth = 0;
        var nextBill = 0;
        var currentMonthJuice = 0;
        var currentStart = "";
        var currentDuration = "";
        var currentCost = "";
        var currentValue = "";
        var in_duration = false;
        var in_start = false;
        var in_cost = false;
        var in_value = false;

        var detail_parser = new xml.SaxParser(function(cb) {
          cb.onStartElementNS(function(elem, attrs, prefix, uri, namespaces) {
              if(elem == "duration") {
                currentDuration = "";
                in_duration = true;
              } else if(elem == "cost") {
                currentCost = "";
                in_cost = true;
              } else if(elem == "start") {
                currentStart = "";
                in_start = true;
              } else if(elem == "value") {
                currentValue = "";
                in_value = true;
              }
          });
          cb.onEndElementNS(function(elem, prefix, uri) {

            if(elem == "IntervalReading") {

                if(earliestDate && currentStart.isBefore(earliestDate)) return;
                if(latestDate && currentStart.isAfter(latestDate)) return;

                if(!billing_periods.length)
                {
                    if(currentStart.getMonth() != currentMonth)
                    {
                        currentMonth = currentStart.getMonth();
                        currentMonthJuice = 0;
                    }
                } else {
                    if(nextBill < billing_periods.length && (currentStart.equals(billing_periods[nextBill]) || currentStart.isAfter(billing_periods[nextBill])))
                    {
                        nextBill++;
                        currentMonthJuice = 0;
                    }
                }

                // At start of every day, add off-peak car charging
                if(currentStart.getOrdinalNumber() != currentDay)
                {
                    currentDay = currentStart.getOrdinalNumber();
                    var extraJuice = milesPerDay * wHPerMile / 1000;

                    // Track this for baseline
                    currentMonthJuice += extraJuice;

                    // Assume car charging is at start of day (ie off-peak midnight)
                    var time = currentStart.clone().clearTime();

                    for(var rateName in pge_data.rates)
                    {
                        var rate = pge_data.rates[rateName];
                        var type = convertToRate( rate, time );
                        var cost = convertToPrice( rate, type, currentMonthJuice, time, allElectric, baselineTerritory ) * extraJuice;

                        totals[rateName][type.split(' ')[0]].cost += cost;
                        totals[rateName][type.split(' ')[0]].numDays++;
                        totals[rateName][type.split(' ')[0]].amount += extraJuice;

                        totals[rateName]['Total'].cost += cost;
                        totals[rateName]['Total'].numDays++;
                        totals[rateName]['Total'].amount += extraJuice;
                    }
                }

                // Now add the current interval's usage
                currentMonthJuice += currentValue;

                for(var rateName in pge_data.rates)
                {
                    var rate = pge_data.rates[rateName];
                    var type = convertToRate( rate, currentStart );
                    var cost = convertToPrice( rate, type, currentMonthJuice, currentStart, allElectric, baselineTerritory ) * currentValue;

                    totals[rateName][type.split(' ')[0]].cost += cost;
                    totals[rateName][type.split(' ')[0]].amount += currentValue;

                    totals[rateName]['Total'].cost += cost;
                    totals[rateName]['Total'].amount += currentValue;
                }
            }
            else if(elem == "duration")
            {
                in_duration = false;
                currentDuration = parseFloat(currentDuration);
            }
            else if(elem == "cost")
            {
                in_cost = false;
                currentCost = parseFloat(currentCost);
            }
            else if(elem == "start")
            {
                in_start = false;
                currentStart = new Date(parseInt(currentStart)*1000);
            }
            else if(elem == "value")
            {
                in_value = false;
                currentValue = parseFloat(currentValue)/1000;
            }
            else if(elem == "feed")
            {
                on_completed(totals);
            }
          });
          cb.onCharacters(function(chars) {
            if(in_duration)
            {
                currentDuration = currentDuration+chars;
            } else if(in_cost)
            {
                currentCost = currentCost+chars;
            } else if(in_start)
            {
                currentStart = currentStart+chars;
            } else if(in_value)
            {
                currentValue = currentValue+chars;
            }
          });
          cb.onWarning(function(msg) {
              util.puts('<WARNING>'+msg+"</WARNING>");
          });
          cb.onError(function(msg) {
              util.puts('<ERROR>'+JSON.stringify(msg)+"</ERROR>");
          });
        });

        return detail_parser;
    }

    return this;
}
