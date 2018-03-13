'use strict';

//const logger            = require('@hughescr/logger').logger;

const expat             = require('node-expat');
const _                 = require('underscore');
// PG&E is all in CA, so always in Pacific timezone
const moment            = require('moment-timezone');
moment.tz('America/Los_Angeles');

module.exports = function(stream) {
    let billing_periods = [];

    return new Promise((resolve, reject) => {
        let in_intervalreading = false;
        let in_start = false;
        let currentStart = '';
        let in_duration = false;
        let currentDuration = '';

        const bill_parser = new expat.Parser('UTF-8');

        bill_parser.on('startElement', name => {
            if(name == 'IntervalReading') {
                in_intervalreading = true;
            }

            if(in_intervalreading && name == 'start') {
                in_start = true;
                currentStart = '';
            }

            if(in_intervalreading && name == 'duration') {
                in_duration = true;
                currentDuration = '';
            }
        });

        bill_parser.on('endElement', name => {
            if(name == 'feed') {
                billing_periods = _.sortBy(billing_periods, 'start');
                resolve(billing_periods);
            }

            if(name == 'IntervalReading') {
                in_intervalreading = false;
                const duration = moment.duration(parseInt(currentDuration), 'seconds');
                const date = moment.unix(currentStart);
                billing_periods.push({ start: date, duration: duration });
            }

            if(in_start && name == 'start') {
                in_start = false;
            }

            if(in_duration && name == 'duration') {
                in_duration = false;
            }
        });

        bill_parser.on('text', text => {
            if(in_start) {
                currentStart = currentStart + text;
            }

            if(in_duration) {
                currentDuration = currentDuration + text;
            }
        });

        bill_parser.on('error', err => {
            reject(err);
        });

        stream.pipe(bill_parser);
    });
};
