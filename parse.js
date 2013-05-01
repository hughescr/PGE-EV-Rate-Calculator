#!/usr/bin/env node

process.env.TZ = 'America/Los_Angeles'

var xml = require('node-xml');
require('date-utils');
var argv = require('optimist')
    .usage('Usage: $0 [-b <baseline territory>] [-m <miles_per_day>] [-c <Wh per mile>] <XML data filename>')
    .demand(1)
    .default('b', 'T')
    .alias('b','baseline-territory')
    .describe('b',"Baseline territory ['P'..'Z'] from http://www.pge.com/tariffs/tm2/pdf/ELEC_PRELIM_A.pdf")
    .default('m', 50)
    .alias('m','miles-per-day')
    .describe('m','How many electric car miles per day do you want to add at off-peak charging')
    .default('c', 350)
    .alias('c','Wh-per-mile')
    .describe('c','How many Wh per mile do you get')
    .boolean('a')
    .alias('a','all-electric')
    .describe('a','Use the "all eletric" baseline numbers -- specify this option if your heating is electric instead of gas')
    .argv

var rates = {
    E1 : {
        schedule: [
            {start_cal: { month: 'May', day: 1 }, end_cal: { month: 'October', day: 31 }, type: 'Summer'},
            {type: 'Winter'}
        ],
        prices: {
            'Summer': [
                { end: 1, rate: 0.13230 },
                { end: 1.3, rate: 0.15040 },
                { end: 2, rate: 0.30025 },
                { rate: 0.34025 },
            ],
            'Winter': [
                { end: 1, rate: 0.13230 },
                { end: 1.3, rate: 0.15040 },
                { end: 2, rate: 0.30025 },
                { rate: 0.34025 },
            ],
        },
        baselines: {
            code_b: {
                'P': { 'Summer': 15.3, 'Winter': 12.7 },
                'Q': { 'Summer': 7.5,  'Winter': 11.7 },
                'R': { 'Summer': 17.1, 'Winter': 11.7 },
                'S': { 'Summer': 15.3, 'Winter': 12.0 },
                'T': { 'Summer': 7.5,  'Winter': 9.1 },
                'V': { 'Summer': 12.0, 'Winter': 13.6 },
                'W': { 'Summer': 18.5, 'Winter': 10.9 },
                'X': { 'Summer': 11.0, 'Winter': 11.7 },
                'Y': { 'Summer': 11.7, 'Winter': 13.2 },
                'Z': { 'Summer': 7.9,  'Winter': 10.6 },
            },
            code_h: {
                'P': { 'Summer': 18.0, 'Winter': 33.9 },
                'Q': { 'Summer': 9.1,  'Winter': 19.3 },
                'R': { 'Summer': 20.9, 'Winter': 30.2 },
                'S': { 'Summer': 18.0, 'Winter': 28.6 },
                'T': { 'Summer': 9.1,  'Winter': 16.8 },
                'V': { 'Summer': 19.4, 'Winter': 33.4 },
                'W': { 'Summer': 23.5, 'Winter': 22.8 },
                'X': { 'Summer': 10.3, 'Winter': 19.3 },
                'Y': { 'Summer': 14.1, 'Winter': 30.7 },
                'Z': { 'Summer': 11.2,  'Winter': 22.5 },
            },
        },
    },
    E6 : {
        schedule: [
            {start_cal: { month: 'May', day: 1 }, end_cal: { month: 'October', day: 31 }, start_day: 'Monday', end_day: 'Friday', start_time: 13, end_time: 19, type: 'Summer Peak'},

            {start_cal: { month: 'May', day: 1 }, end_cal: { month: 'October', day: 31 }, start_day: 'Monday', end_day: 'Friday', start_time: 10, end_time: 13, type: 'Summer Partial Peak'},
            {start_cal: { month: 'May', day: 1 }, end_cal: { month: 'October', day: 31 }, start_day: 'Monday', end_day: 'Friday', start_time: 19, end_time: 21, type: 'Summer Partial Peak'},
            {start_cal: { month: 'May', day: 1 }, end_cal: { month: 'October', day: 31 }, start_day: 'Saturday', end_day: 'Sunday', start_time: 17, end_time: 20, type: 'Summer Partial Peak'},

            {start_cal: { month: 'May', day: 1 }, end_cal: { month: 'October', day: 31 }, type: 'Summer Off Peak'},

            {start_cal: { month: 'November', day: 1 }, end_cal: { month: 'December', day: 31 }, start_day: 'Monday', end_day: 'Friday', start_time: 17, end_time: 20, type: 'Winter Partial Peak'},
            {start_cal: { month: 'January', day: 1 }, end_cal: { month: 'April', day: 30 }, start_day: 'Monday', end_day: 'Friday', start_time: 17, end_time: 20, type: 'Winter Partial Peak'},

            {type: 'Winter Off Peak'}
        ],
        baselines: {
            code_b: {
                'P': { 'Summer': 15.3, 'Winter': 12.7 },
                'Q': { 'Summer': 7.5,  'Winter': 11.7 },
                'R': { 'Summer': 17.1, 'Winter': 11.7 },
                'S': { 'Summer': 15.3, 'Winter': 12.0 },
                'T': { 'Summer': 7.5,  'Winter': 9.1 },
                'V': { 'Summer': 12.0, 'Winter': 13.6 },
                'W': { 'Summer': 18.5, 'Winter': 10.9 },
                'X': { 'Summer': 11.0, 'Winter': 11.7 },
                'Y': { 'Summer': 11.7, 'Winter': 13.2 },
                'Z': { 'Summer': 7.9,  'Winter': 10.6 },
            },
            code_h: {
                'P': { 'Summer': 18.0, 'Winter': 33.9 },
                'Q': { 'Summer': 9.1,  'Winter': 19.3 },
                'R': { 'Summer': 20.9, 'Winter': 30.2 },
                'S': { 'Summer': 18.0, 'Winter': 28.6 },
                'T': { 'Summer': 9.1,  'Winter': 16.8 },
                'V': { 'Summer': 19.4, 'Winter': 33.4 },
                'W': { 'Summer': 23.5, 'Winter': 22.8 },
                'X': { 'Summer': 10.3, 'Winter': 19.3 },
                'Y': { 'Summer': 14.1, 'Winter': 30.7 },
                'Z': { 'Summer': 11.2,  'Winter': 22.5 },
            },
        },
        prices: {
            'Summer Peak': [
                { end: 1, rate: 0.28719 },
                { end: 1.3, rate: 0.30529 },
                { end: 2, rate: 0.46623 },
                { rate: 0.50623 },
            ],
            'Summer Partial Peak' : [
                { end: 1, rate: 0.17528 },
                { end: 1.3, rate: 0.19338 },
                { end: 2, rate: 0.35432 },
                { rate: 0.39432 },
            ],
            'Summer Off Peak' : [
                { end: 1, rate: 0.10074 },
                { end: 1.3, rate: 0.11884 },
                { end: 2, rate: 0.27978 },
                { rate: 0.31978 },
            ],
            'Winter Partial Peak': [
                { end: 1, rate: 0.12129 },
                { end: 1.3, rate: 0.13939 },
                { end: 2, rate: 0.30033 },
                { rate: 0.34033 },
            ],
            'Winter Off Peak': [
                { end: 1, rate: 0.10495 },
                { end: 1.3, rate: 0.12305 },
                { end: 2, rate: 0.28399 },
                { rate: 0.32399 },
            ],
        }
    },
    E9: {
        schedule: [
            {start_cal: { month: 'May', day: 1 }, end_cal: { month: 'October', day: 31 }, start_day: 'Monday', end_day: 'Friday', start_time: 14, end_time: 21, type: 'Summer Peak'},

            {start_cal: { month: 'May', day: 1 }, end_cal: { month: 'October', day: 31 }, start_day: 'Monday', end_day: 'Friday', start_time: 7, end_time: 14, type: 'Summer Partial Peak'},
            {start_cal: { month: 'May', day: 1 }, end_cal: { month: 'October', day: 31 }, start_day: 'Monday', end_day: 'Friday', start_time: 21, end_time: 24, type: 'Summer Partial Peak'},
            {start_cal: { month: 'May', day: 1 }, end_cal: { month: 'October', day: 31 }, start_day: 'Saturday', end_day: 'Sunday', start_time: 17, end_time: 21, type: 'Summer Partial Peak'},

            {start_cal: { month: 'May', day: 1 }, end_cal: { month: 'October', day: 31 }, type: 'Summer Off Peak'},

            {start_cal: { month: 'November', day: 1 }, end_cal: { month: 'December', day: 31 }, start_day: 'Monday', end_day: 'Friday', start_time: 7, end_time: 24, type: 'Winter Partial Peak'},
            {start_cal: { month: 'November', day: 1 }, end_cal: { month: 'December', day: 31 }, start_day: 'Saturday', end_day: 'Sunday', start_time: 17, end_time: 21, type: 'Winter Partial Peak'},
            {start_cal: { month: 'January', day: 1 }, end_cal: { month: 'April', day: 30 }, start_day: 'Monday', end_day: 'Friday', start_time: 7, end_time: 24, type: 'Winter Partial Peak'},
            {start_cal: { month: 'January', day: 1 }, end_cal: { month: 'April', day: 30 }, start_day: 'Saturday', end_day: 'Sunday', start_time: 17, end_time: 21, type: 'Winter Partial Peak'},

            {type: 'Winter Off Peak'}
        ],
        baselines: {
            code_b: {
                'P': { 'Summer': 15.3, 'Winter': 12.7 },
                'Q': { 'Summer': 7.5,  'Winter': 11.7 },
                'R': { 'Summer': 17.1, 'Winter': 11.7 },
                'S': { 'Summer': 15.3, 'Winter': 12.0 },
                'T': { 'Summer': 7.5,  'Winter': 9.1 },
                'V': { 'Summer': 12.0, 'Winter': 13.6 },
                'W': { 'Summer': 18.5, 'Winter': 10.9 },
                'X': { 'Summer': 11.0, 'Winter': 11.7 },
                'Y': { 'Summer': 11.7, 'Winter': 13.2 },
                'Z': { 'Summer': 7.9,  'Winter': 10.6 },
            },
            code_h: {
                'P': { 'Summer': 18.0, 'Winter': 33.9 },
                'Q': { 'Summer': 9.1,  'Winter': 19.3 },
                'R': { 'Summer': 20.9, 'Winter': 30.2 },
                'S': { 'Summer': 18.0, 'Winter': 28.6 },
                'T': { 'Summer': 9.1,  'Winter': 16.8 },
                'V': { 'Summer': 19.4, 'Winter': 33.4 },
                'W': { 'Summer': 23.5, 'Winter': 22.8 },
                'X': { 'Summer': 10.3, 'Winter': 19.3 },
                'Y': { 'Summer': 14.1, 'Winter': 30.7 },
                'Z': { 'Summer': 11.2,  'Winter': 22.5 },
            },
        },
        prices: {
            'Summer Peak': [
                { end: 1, rate: 0.31083 },
                { end: 1.3, rate: 0.32954 },
                { end: 2, rate: 0.51124 },
                { rate: 0.55124 },
            ],
            'Summer Partial Peak' : [
                { end: 1, rate: 0.10172 },
                { end: 1.3, rate: 0.12043 },
                { end: 2, rate: 0.30213 },
                { rate: 0.34213 },
            ],
            'Summer Off Peak' : [
                { end: 1, rate: 0.03855 },
                { end: 1.3, rate: 0.05726 },
                { end: 2, rate: 0.16056 },
                { rate: 0.20056 },
            ],
            'Winter Partial Peak': [
                { end: 1, rate: 0.10160 },
                { end: 1.3, rate: 0.12029 },
                { end: 2, rate: 0.30200 },
                { rate: 0.34200 },
            ],
            'Winter Off Peak': [
                { end: 1, rate: 0.04820 },
                { end: 1.3, rate: 0.06690 },
                { end: 2, rate: 0.16056 },
                { rate: 0.20056 },
            ],
        }
    },
    EV: {
        schedule: [
            {start_cal: { month: 'May', day: 1 }, end_cal: { month: 'October', day: 31 }, start_day: 'Monday', end_day: 'Friday', start_time: 14, end_time: 21, type: 'Summer Peak'},
            {start_cal: { month: 'May', day: 1 }, end_cal: { month: 'October', day: 31 }, start_day: 'Saturday', end_day: 'Sunday', start_time: 15, end_time: 19, type: 'Summer Peak'},

            {start_cal: { month: 'May', day: 1 }, end_cal: { month: 'October', day: 31 }, start_day: 'Monday', end_day: 'Friday', start_time: 7, end_time: 14, type: 'Summer Partial Peak'},
            {start_cal: { month: 'May', day: 1 }, end_cal: { month: 'October', day: 31 }, start_day: 'Monday', end_day: 'Friday', start_time: 21, end_time: 23, type: 'Summer Partial Peak'},

            {start_cal: { month: 'May', day: 1 }, end_cal: { month: 'October', day: 31 }, type: 'Summer Off Peak'},

            {start_cal: { month: 'November', day: 1 }, end_cal: { month: 'December', day: 31 }, start_day: 'Monday', end_day: 'Friday', start_time: 14, end_time: 21, type: 'Winter Peak'},
            {start_cal: { month: 'November', day: 1 }, end_cal: { month: 'December', day: 31 }, start_day: 'Saturday', end_day: 'Sunday', start_time: 15, end_time: 19, type: 'Winter Peak'},
            {start_cal: { month: 'January', day: 1 }, end_cal: { month: 'April', day: 30 }, start_day: 'Monday', end_day: 'Friday', start_time: 14, end_time: 21, type: 'Winter Peak'},
            {start_cal: { month: 'January', day: 1 }, end_cal: { month: 'April', day: 30 }, start_day: 'Saturday', end_day: 'Sunday', start_time: 15, end_time: 19, type: 'Winter Peak'},

            {start_cal: { month: 'November', day: 1 }, end_cal: { month: 'December', day: 31 }, start_day: 'Monday', end_day: 'Friday', start_time: 7, end_time: 14, type: 'Winter Partial Peak'},
            {start_cal: { month: 'November', day: 1 }, end_cal: { month: 'December', day: 31 }, start_day: 'Monday', end_day: 'Friday', start_time: 21, end_time: 23, type: 'Winter Partial Peak'},
            {start_cal: { month: 'January', day: 1 }, end_cal: { month: 'April', day: 30 }, start_day: 'Monday', end_day: 'Friday', start_time: 7, end_time: 14, type: 'Winter Partial Peak'},
            {start_cal: { month: 'January', day: 1 }, end_cal: { month: 'April', day: 30 }, start_day: 'Monday', end_day: 'Friday', start_time: 21, end_time: 23, type: 'Winter Partial Peak'},

            {type: 'Winter Off Peak'}
        ],
        prices: {
            'Summer Peak': [
                { rate: 0.35656 },
            ],
            'Summer Partial Peak' : [
                { rate: 0.19914 },
            ],
            'Summer Off Peak' : [
                { rate: 0.09712 },
            ],
            'Winter Peak': [
                { rate: 0.26694 },
            ],
            'Winter Partial Peak': [
                { rate: 0.16472 },
            ],
            'Winter Off Peak': [
                { rate: 0.09930 },
            ],
        }
    },
}

var totals = {
    // In here will be objects like:
    // e6 : { 'Summer': { cost: 123, numDays: 123}, 'Winter': {cost: 123, numDays: 123}, 'Total': {cost: 246, numDays: 123} }, ...
};

for(var rateName in rates)
{
    totals[rateName] = {};
    for(var periodName in rates[rateName].prices)
    {
        totals[rateName][periodName.split(' ')[0]] = { cost: 0, numDays: 0 };
    }
    totals[rateName]['Total'] = { cost: 0, numDays: 0 };
}


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

function convertToPrice(some_plan, some_rate, accumulated, time)
{
    var rate = 0;
    var baseline = 1;
    if(some_plan.baselines)
    {
        var daysThisMonth = time.getDaysBetween(time.clone().addMonths(1));
        // Figure out what tier we're in
        baseline = some_plan.baselines[argv.a?'code_h':'code_b'][argv.b][some_rate.split(' ')[0]] * daysThisMonth;
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

/* These variables track state during parsing */
var currentDay = 0;
var currentMonth = 0;
var currentMonthJuice = 0;
var currentStart = "";
var currentDuration = "";
var currentCost = "";
var currentValue = "";
var in_duration = false;
var in_start = false;
var in_cost = false;
var in_value = false;

var parser = new xml.SaxParser(function(cb) {
  cb.onStartDocument(function() {

  });
  cb.onEndDocument(function() {
        // Print out report
        for(var rate in totals)
        {
            data = totals[rate];
            console.log("Rate: "+rate);
            for(var period in data)
            {
                sub_data = data[period];
                console.log(period+"\tCost: "+Math.round(sub_data.cost*100)/100+"\t Per day: "+Math.round(100*sub_data.cost/sub_data.numDays)/100);
            }
        }
  });
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

        if(currentStart.getMonth() != currentMonth)
        {
            currentMonth = currentStart.getMonth();
            currentMonthJuice = 0;
        }

        // At start of every day, add off-peak car charging
        if(currentStart.getOrdinalNumber() != currentDay)
        {
            currentDay = currentStart.getOrdinalNumber();
            var extraJuice = argv.m * argv.c / 1000;

            // Track this for baseline
            currentMonthJuice += extraJuice;

            // Assume car charging is at start of day (ie off-peak midnight)
            var time = currentStart.clone().clearTime();

            for(var rateName in rates)
            {
                var rate = rates[rateName];
                var type = convertToRate( rate, time );
                var cost = convertToPrice( rate, type, currentMonthJuice, time ) * extraJuice;

                totals[rateName][type.split(' ')[0]].cost += cost;
                totals[rateName][type.split(' ')[0]].numDays++;

                totals[rateName]['Total'].cost += cost;
                totals[rateName]['Total'].numDays++;
            }
        }

        // Now add the current interval's usage
        currentMonthJuice += currentValue;

        for(var rateName in rates)
        {
            var rate = rates[rateName];
            var type = convertToRate( rate, currentStart );
            var cost = convertToPrice( rate, type, currentMonthJuice, currentStart ) * currentValue;

            totals[rateName][type.split(' ')[0]].cost += cost;

            totals[rateName]['Total'].cost += cost;
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
      console.log('<WARNING>'+msg+"</WARNING>");
  });
  cb.onError(function(msg) {
      console.log('<ERROR>'+JSON.stringify(msg)+"</ERROR>");
  });
});



//example read from file
parser.parseFile(argv._[0]);
