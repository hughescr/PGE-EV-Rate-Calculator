Object.defineProperty(exports, 'rates',
{
    value : {
        E1 : {
            schedule: [
                { start_cal: { month: 'May', day: 1 }, end_cal: { month: 'October', day: 31 }, type: 'Summer' },
                { type: 'Winter' },
            ],
            prices: {
                Summer: [
                    { end: 1, rate: 0.18212 },
                    { end: 1.3, rate: 0.22481 },
                    { end: 2, rate: 0.28578 },
                    { rate: 0.36389 },
                ],
                Winter: [
                    { end: 1, rate: 0.18212 },
                    { end: 1.3, rate: 0.22481 },
                    { end: 2, rate: 0.28578 },
                    { rate: 0.36389 },
                ],
            },
            baselines: {
                code_b: {
                    P: { Summer: 13.8, Winter: 12.3 },
                    Q: { Summer: 7.0,  Winter: 12.3 },
                    R: { Summer: 15.6, Winter: 11.0 },
                    S: { Summer: 13.8, Winter: 11.2 },
                    T: { Summer: 7.0,  Winter:  8.5 },
                    V: { Summer: 8.7,  Winter: 10.6 },
                    W: { Summer: 16.8, Winter: 10.1 },
                    X: { Summer: 10.1, Winter: 10.9 },
                    Y: { Summer: 10.6, Winter: 12.6 },
                    Z: { Summer: 6.2,  Winter: 9.0 },
                },
                code_h: {
                    P: { Summer: 16.4, Winter: 29.6 },
                    Q: { Summer: 8.3,  Winter: 29.6 },
                    R: { Summer: 18.8, Winter: 29.8 },
                    S: { Summer: 16.4, Winter: 27.1 },
                    T: { Summer: 8.3,  Winter: 14.9 },
                    V: { Summer: 13.6, Winter: 26.6 },
                    W: { Summer: 20.8, Winter: 20.6 },
                    X: { Summer: 9.3,  Winter: 16.7 },
                    Y: { Summer: 13.0, Winter: 27.1 },
                    Z: { Summer: 7.7,  Winter: 18.7 },
                },
            },
        },
        E6 : {
            schedule: [
                { start_cal: { month: 'May', day: 1 }, end_cal: { month: 'October', day: 31 }, start_day: 'Monday', end_day: 'Friday', start_time: 13, end_time: 19, type: 'Summer Peak' },

                { start_cal: { month: 'May', day: 1 }, end_cal: { month: 'October', day: 31 }, start_day: 'Monday', end_day: 'Friday', start_time: 10, end_time: 13, type: 'Summer Partial Peak' },
                { start_cal: { month: 'May', day: 1 }, end_cal: { month: 'October', day: 31 }, start_day: 'Monday', end_day: 'Friday', start_time: 19, end_time: 21, type: 'Summer Partial Peak' },
                { start_cal: { month: 'May', day: 1 }, end_cal: { month: 'October', day: 31 }, start_day: 'Saturday', end_day: 'Sunday', start_time: 17, end_time: 20, type: 'Summer Partial Peak' },

                { start_cal: { month: 'May', day: 1 }, end_cal: { month: 'October', day: 31 }, type: 'Summer Off Peak' },

                { start_cal: { month: 'November', day: 1 }, end_cal: { month: 'December', day: 31 }, start_day: 'Monday', end_day: 'Friday', start_time: 17, end_time: 20, type: 'Winter Partial Peak' },
                { start_cal: { month: 'January', day: 1 }, end_cal: { month: 'April', day: 30 }, start_day: 'Monday', end_day: 'Friday', start_time: 17, end_time: 20, type: 'Winter Partial Peak' },

                { type: 'Winter Off Peak' },
            ],
            baselines: {
                code_b: {
                    P: { Summer: 13.8, Winter: 12.3 },
                    Q: { Summer: 7.0,  Winter: 12.3 },
                    R: { Summer: 15.6, Winter: 11.0 },
                    S: { Summer: 13.8, Winter: 11.2 },
                    T: { Summer: 7.0,  Winter:  8.5 },
                    V: { Summer: 8.7,  Winter: 10.6 },
                    W: { Summer: 16.8, Winter: 10.1 },
                    X: { Summer: 10.1, Winter: 10.9 },
                    Y: { Summer: 10.6, Winter: 12.6 },
                    Z: { Summer: 6.2,  Winter: 9.0 },
                },
                code_h: {
                    P: { Summer: 16.4, Winter: 29.6 },
                    Q: { Summer: 8.3,  Winter: 29.6 },
                    R: { Summer: 18.8, Winter: 29.8 },
                    S: { Summer: 16.4, Winter: 27.1 },
                    T: { Summer: 8.3,  Winter: 14.9 },
                    V: { Summer: 13.6, Winter: 26.6 },
                    W: { Summer: 20.8, Winter: 20.6 },
                    X: { Summer: 9.3,  Winter: 16.7 },
                    Y: { Summer: 13.0, Winter: 27.1 },
                    Z: { Summer: 7.7,  Winter: 18.7 },
                },
            },
            prices: {
                'Summer Peak': [
                    { end: 1, rate: 0.34166 },
                    { end: 1.3, rate: 0.38435 },
                    { end: 2, rate: 0.44442 },
                    { rate: 0.52253 },
                ],
                'Summer Partial Peak' : [
                    { end: 1, rate: 0.22638 },
                    { end: 1.3, rate: 0.26908 },
                    { end: 2, rate: 0.32915 },
                    { rate: 0.40726 },
                ],
                'Summer Off Peak' : [
                    { end: 1, rate: 0.14961 },
                    { end: 1.3, rate: 0.19231 },
                    { end: 2, rate: 0.25237 },
                    { rate: 0.33048 },
                ],
                'Winter Partial Peak': [
                    { end: 1, rate: 0.17078 },
                    { end: 1.3, rate: 0.21347 },
                    { end: 2, rate: 0.27354 },
                    { rate: 0.35165 },
                ],
                'Winter Off Peak': [
                    { end: 1, rate: 0.15395 },
                    { end: 1.3, rate: 0.19664 },
                    { end: 2, rate: 0.25671 },
                    { rate: 0.33482 },
                ],
            },
        },
        E7 : {
            schedule: [
                { start_cal: { month: 'May', day: 1 }, end_cal: { month: 'October', day: 31 }, start_day: 'Monday', end_day: 'Friday', start_time: 12, end_time: 18, type: 'Summer Peak' },

                { start_cal: { month: 'May', day: 1 }, end_cal: { month: 'October', day: 31 }, type: 'Summer Off Peak' },

                { start_cal: { month: 'November', day: 1 }, end_cal: { month: 'December', day: 31 }, start_day: 'Monday', end_day: 'Friday', start_time: 12, end_time: 18, type: 'Winter Peak' },
                { start_cal: { month: 'January', day: 1 }, end_cal: { month: 'April', day: 30 }, start_day: 'Monday', end_day: 'Friday', start_time: 12, end_time: 18, type: 'Winter Peak' },

                { type: 'Winter Off Peak' },
            ],
            baselines: {
                code_b: {
                    P: { Summer: 13.8, Winter: 12.3 },
                    Q: { Summer: 7.0,  Winter: 12.3 },
                    R: { Summer: 15.6, Winter: 11.0 },
                    S: { Summer: 13.8, Winter: 11.2 },
                    T: { Summer: 7.0,  Winter:  8.5 },
                    V: { Summer: 8.7,  Winter: 10.6 },
                    W: { Summer: 16.8, Winter: 10.1 },
                    X: { Summer: 10.1, Winter: 10.9 },
                    Y: { Summer: 10.6, Winter: 12.6 },
                    Z: { Summer: 6.2,  Winter: 9.0 },
                },
                code_h: {
                    P: { Summer: 16.4, Winter: 29.6 },
                    Q: { Summer: 8.3,  Winter: 29.6 },
                    R: { Summer: 18.8, Winter: 29.8 },
                    S: { Summer: 16.4, Winter: 27.1 },
                    T: { Summer: 8.3,  Winter: 14.9 },
                    V: { Summer: 13.6, Winter: 26.6 },
                    W: { Summer: 20.8, Winter: 20.6 },
                    X: { Summer: 9.3,  Winter: 16.7 },
                    Y: { Summer: 13.0, Winter: 27.1 },
                    Z: { Summer: 7.7,  Winter: 18.7 },
                },
            },
            prices: {
                'Summer Peak': [
                    { end: 1, rate: 0.37804 },
                    { end: 1.3, rate: 0.42136 },
                    { end: 2, rate: 0.48232 },
                    { rate: 0.56043 },
                ],
                'Summer Off Peak' : [
                    { end: 1, rate: 0.12989 },
                    { end: 1.3, rate: 0.17320 },
                    { end: 2, rate: 0.23417 },
                    { rate: 0.31228 },
                ],
                'Winter Peak': [
                    { end: 1, rate: 0.16354 },
                    { end: 1.3, rate: 0.20685 },
                    { end: 2, rate: 0.26782 },
                    { rate: 0.34593 },
                ],
                'Winter Off Peak': [
                    { end: 1, rate: 0.13350 },
                    { end: 1.3, rate: 0.17681 },
                    { end: 2, rate: 0.23778 },
                    { rate: 0.31589 },
                ],
            },
        },
        E8 : {
            schedule: [
                { start_cal: { month: 'May', day: 1 }, end_cal: { month: 'October', day: 31 }, type: 'Summer' },
                { type: 'Winter' },
            ],
            prices: {
                Summer: [
                    { end: 1, rate: 0.18602 },
                    { end: 1.3, rate: 0.20133 },
                    { end: 2, rate: 0.25976 },
                    { rate: 0.33463 },
                ],
                Winter: [
                    { end: 1, rate: 0.13540 },
                    { end: 1.3, rate: 0.15071 },
                    { end: 2, rate: 0.20913 },
                    { rate: 0.28400 },
                ],
            },
            baselines: {
                code_b: {
                    P: { Summer: 13.8, Winter: 12.3 },
                    Q: { Summer: 7.0,  Winter: 12.3 },
                    R: { Summer: 15.6, Winter: 11.0 },
                    S: { Summer: 13.8, Winter: 11.2 },
                    T: { Summer: 7.0,  Winter:  8.5 },
                    V: { Summer: 8.7,  Winter: 10.6 },
                    W: { Summer: 16.8, Winter: 10.1 },
                    X: { Summer: 10.1, Winter: 10.9 },
                    Y: { Summer: 10.6, Winter: 12.6 },
                    Z: { Summer: 6.2,  Winter: 9.0 },
                },
                code_h: {
                    P: { Summer: 16.4, Winter: 29.6 },
                    Q: { Summer: 8.3,  Winter: 29.6 },
                    R: { Summer: 18.8, Winter: 29.8 },
                    S: { Summer: 16.4, Winter: 27.1 },
                    T: { Summer: 8.3,  Winter: 14.9 },
                    V: { Summer: 13.6, Winter: 26.6 },
                    W: { Summer: 20.8, Winter: 20.6 },
                    X: { Summer: 9.3,  Winter: 16.7 },
                    Y: { Summer: 13.0, Winter: 27.1 },
                    Z: { Summer: 7.7,  Winter: 18.7 },
                },
            },
        },
        E9: {
            schedule: [
                { start_cal: { month: 'May', day: 1 }, end_cal: { month: 'October', day: 31 }, start_day: 'Monday', end_day: 'Friday', start_time: 14, end_time: 21, type: 'Summer Peak' },

                { start_cal: { month: 'May', day: 1 }, end_cal: { month: 'October', day: 31 }, start_day: 'Monday', end_day: 'Friday', start_time: 7, end_time: 14, type: 'Summer Partial Peak' },
                { start_cal: { month: 'May', day: 1 }, end_cal: { month: 'October', day: 31 }, start_day: 'Monday', end_day: 'Friday', start_time: 21, end_time: 24, type: 'Summer Partial Peak' },
                { start_cal: { month: 'May', day: 1 }, end_cal: { month: 'October', day: 31 }, start_day: 'Saturday', end_day: 'Sunday', start_time: 17, end_time: 21, type: 'Summer Partial Peak' },

                { start_cal: { month: 'May', day: 1 }, end_cal: { month: 'October', day: 31 }, type: 'Summer Off Peak' },

                { start_cal: { month: 'November', day: 1 }, end_cal: { month: 'December', day: 31 }, start_day: 'Monday', end_day: 'Friday', start_time: 7, end_time: 24, type: 'Winter Partial Peak' },
                { start_cal: { month: 'November', day: 1 }, end_cal: { month: 'December', day: 31 }, start_day: 'Saturday', end_day: 'Sunday', start_time: 17, end_time: 21, type: 'Winter Partial Peak' },
                { start_cal: { month: 'January', day: 1 }, end_cal: { month: 'April', day: 30 }, start_day: 'Monday', end_day: 'Friday', start_time: 7, end_time: 24, type: 'Winter Partial Peak' },
                { start_cal: { month: 'January', day: 1 }, end_cal: { month: 'April', day: 30 }, start_day: 'Saturday', end_day: 'Sunday', start_time: 17, end_time: 21, type: 'Winter Partial Peak' },

                { type: 'Winter Off Peak' },
            ],
            baselines: {
                code_b: {
                    P: { Summer: 13.8, Winter: 12.3 },
                    Q: { Summer: 7.0,  Winter: 12.3 },
                    R: { Summer: 15.6, Winter: 11.0 },
                    S: { Summer: 13.8, Winter: 11.2 },
                    T: { Summer: 7.0,  Winter:  8.5 },
                    V: { Summer: 8.7,  Winter: 10.6 },
                    W: { Summer: 16.8, Winter: 10.1 },
                    X: { Summer: 10.1, Winter: 10.9 },
                    Y: { Summer: 10.6, Winter: 12.6 },
                    Z: { Summer: 6.2,  Winter: 9.0 },
                },
                code_h: {
                    P: { Summer: 16.4, Winter: 29.6 },
                    Q: { Summer: 8.3,  Winter: 29.6 },
                    R: { Summer: 18.8, Winter: 29.8 },
                    S: { Summer: 16.4, Winter: 27.1 },
                    T: { Summer: 8.3,  Winter: 14.9 },
                    V: { Summer: 13.6, Winter: 26.6 },
                    W: { Summer: 20.8, Winter: 20.6 },
                    X: { Summer: 9.3,  Winter: 16.7 },
                    Y: { Summer: 13.0, Winter: 27.1 },
                    Z: { Summer: 7.7,  Winter: 18.7 },
                },
            },
            prices: {
                'Summer Peak': [
                    { end: 1, rate: 0.36539 },
                    { end: 1.3, rate: 0.39998 },
                    { end: 2, rate: 0.49112 },
                    { rate: 0.56599 },
                ],
                'Summer Partial Peak' : [
                    { end: 1, rate: 0.15001 },
                    { end: 1.3, rate: 0.18459 },
                    { end: 2, rate: 0.27575 },
                    { rate: 0.35061 },
                ],
                'Summer Off Peak' : [
                    { end: 1, rate: 0.08495 },
                    { end: 1.3, rate: 0.11954 },
                    { end: 2, rate: 0.12523 },
                    { rate: 0.20009 },
                ],
                'Winter Partial Peak': [
                    { end: 1, rate: 0.14989 },
                    { end: 1.3, rate: 0.18446 },
                    { end: 2, rate: 0.27562 },
                    { rate: 0.35048 },
                ],
                'Winter Off Peak': [
                    { end: 1, rate: 0.09489 },
                    { end: 1.3, rate: 0.12946 },
                    { end: 2, rate: 0.12522 },
                    { rate: 0.20009 },
                ],
            },
        },
        EV: {
            schedule: [
                { start_cal: { month: 'May', day: 1 }, end_cal: { month: 'October', day: 31 }, start_day: 'Monday', end_day: 'Friday', start_time: 14, end_time: 21, type: 'Summer Peak' },
                { start_cal: { month: 'May', day: 1 }, end_cal: { month: 'October', day: 31 }, start_day: 'Saturday', end_day: 'Sunday', start_time: 15, end_time: 19, type: 'Summer Peak' },

                { start_cal: { month: 'May', day: 1 }, end_cal: { month: 'October', day: 31 }, start_day: 'Monday', end_day: 'Friday', start_time: 7, end_time: 14, type: 'Summer Partial Peak' },
                { start_cal: { month: 'May', day: 1 }, end_cal: { month: 'October', day: 31 }, start_day: 'Monday', end_day: 'Friday', start_time: 21, end_time: 23, type: 'Summer Partial Peak' },

                { start_cal: { month: 'May', day: 1 }, end_cal: { month: 'October', day: 31 }, type: 'Summer Off Peak' },

                { start_cal: { month: 'November', day: 1 }, end_cal: { month: 'December', day: 31 }, start_day: 'Monday', end_day: 'Friday', start_time: 14, end_time: 21, type: 'Winter Peak' },
                { start_cal: { month: 'November', day: 1 }, end_cal: { month: 'December', day: 31 }, start_day: 'Saturday', end_day: 'Sunday', start_time: 15, end_time: 19, type: 'Winter Peak' },
                { start_cal: { month: 'January', day: 1 }, end_cal: { month: 'April', day: 30 }, start_day: 'Monday', end_day: 'Friday', start_time: 14, end_time: 21, type: 'Winter Peak' },
                { start_cal: { month: 'January', day: 1 }, end_cal: { month: 'April', day: 30 }, start_day: 'Saturday', end_day: 'Sunday', start_time: 15, end_time: 19, type: 'Winter Peak' },

                { start_cal: { month: 'November', day: 1 }, end_cal: { month: 'December', day: 31 }, start_day: 'Monday', end_day: 'Friday', start_time: 7, end_time: 14, type: 'Winter Partial Peak' },
                { start_cal: { month: 'November', day: 1 }, end_cal: { month: 'December', day: 31 }, start_day: 'Monday', end_day: 'Friday', start_time: 21, end_time: 23, type: 'Winter Partial Peak' },
                { start_cal: { month: 'January', day: 1 }, end_cal: { month: 'April', day: 30 }, start_day: 'Monday', end_day: 'Friday', start_time: 7, end_time: 14, type: 'Winter Partial Peak' },
                { start_cal: { month: 'January', day: 1 }, end_cal: { month: 'April', day: 30 }, start_day: 'Monday', end_day: 'Friday', start_time: 21, end_time: 23, type: 'Winter Partial Peak' },

                { type: 'Winter Off Peak' },
            ],
            prices: {
                'Summer Peak': [
                    { rate: 0.44402 },
                ],
                'Summer Partial Peak' : [
                    { rate: 0.24156 },
                ],
                'Summer Off Peak' : [
                    { rate: 0.11466 },
                ],
                'Winter Peak': [
                    { rate: 0.31228 },
                ],
                'Winter Partial Peak': [
                    { rate: 0.19043 },
                ],
                'Winter Off Peak': [
                    { rate: 0.11742 },
                ],
            },
        },
    },
    enumerable: true,
    writable: false,
    configurable: false,
});

