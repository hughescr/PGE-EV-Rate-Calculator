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
                    { end: 1,        rate: 18212 },
                    { end: 1.3,      rate: 22481 },
                    { end: 2,        rate: 28578 },
                    {                rate: 36389 },
                ],
                Winter: [
                    { end: 1,        rate: 18212 },
                    { end: 1.3,      rate: 22481 },
                    { end: 2,        rate: 28578 },
                    {                rate: 36389 },
                ],
            },
            baselines: {
                code_b: {
                    P: { Summer: 13.8, Winter: 12.3 },
                    Q: { Summer:  7.0, Winter: 12.3 },
                    R: { Summer: 15.6, Winter: 11.0 },
                    S: { Summer: 13.8, Winter: 11.2 },
                    T: { Summer:  7.0, Winter:  8.5 },
                    V: { Summer:  8.7, Winter: 10.6 },
                    W: { Summer: 16.8, Winter: 10.1 },
                    X: { Summer: 10.1, Winter: 10.9 },
                    Y: { Summer: 10.6, Winter: 12.6 },
                    Z: { Summer:  6.2, Winter:  9.0 },
                },
                code_h: {
                    P: { Summer: 16.4, Winter: 29.6 },
                    Q: { Summer:  8.3, Winter: 29.6 },
                    R: { Summer: 18.8, Winter: 29.8 },
                    S: { Summer: 16.4, Winter: 27.1 },
                    T: { Summer:  8.3, Winter: 14.9 },
                    V: { Summer: 13.6, Winter: 26.6 },
                    W: { Summer: 20.8, Winter: 20.6 },
                    X: { Summer:  9.3, Winter: 16.7 },
                    Y: { Summer: 13.0, Winter: 27.1 },
                    Z: { Summer:  7.7, Winter: 18.7 },
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
                    Q: { Summer:  7.0, Winter: 12.3 },
                    R: { Summer: 15.6, Winter: 11.0 },
                    S: { Summer: 13.8, Winter: 11.2 },
                    T: { Summer:  7.0, Winter:  8.5 },
                    V: { Summer:  8.7, Winter: 10.6 },
                    W: { Summer: 16.8, Winter: 10.1 },
                    X: { Summer: 10.1, Winter: 10.9 },
                    Y: { Summer: 10.6, Winter: 12.6 },
                    Z: { Summer:  6.2, Winter:  9.0 },
                },
                code_h: {
                    P: { Summer: 16.4, Winter: 29.6 },
                    Q: { Summer:  8.3, Winter: 29.6 },
                    R: { Summer: 18.8, Winter: 29.8 },
                    S: { Summer: 16.4, Winter: 27.1 },
                    T: { Summer:  8.3, Winter: 14.9 },
                    V: { Summer: 13.6, Winter: 26.6 },
                    W: { Summer: 20.8, Winter: 20.6 },
                    X: { Summer:  9.3, Winter: 16.7 },
                    Y: { Summer: 13.0, Winter: 27.1 },
                    Z: { Summer:  7.7, Winter: 18.7 },
                },
            },
            prices: {
                'Summer Peak': [
                    { end: 1,        rate: 34166 },
                    { end: 1.3,      rate: 38435 },
                    { end: 2,        rate: 44442 },
                    {                rate: 52253 },
                ],
                'Summer Partial Peak' : [
                    { end: 1,        rate: 22638 },
                    { end: 1.3,      rate: 26908 },
                    { end: 2,        rate: 32915 },
                    {                rate: 40726 },
                ],
                'Summer Off Peak' : [
                    { end: 1,        rate: 14961 },
                    { end: 1.3,      rate: 19231 },
                    { end: 2,        rate: 25237 },
                    {                rate: 33048 },
                ],
                'Winter Partial Peak': [
                    { end: 1,        rate: 17078 },
                    { end: 1.3,      rate: 21347 },
                    { end: 2,        rate: 27354 },
                    {                rate: 35165 },
                ],
                'Winter Off Peak': [
                    { end: 1,        rate: 15395 },
                    { end: 1.3,      rate: 19664 },
                    { end: 2,        rate: 25671 },
                    {                rate: 33482 },
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
                    Q: { Summer:  7.0, Winter: 12.3 },
                    R: { Summer: 15.6, Winter: 11.0 },
                    S: { Summer: 13.8, Winter: 11.2 },
                    T: { Summer:  7.0, Winter:  8.5 },
                    V: { Summer:  8.7, Winter: 10.6 },
                    W: { Summer: 16.8, Winter: 10.1 },
                    X: { Summer: 10.1, Winter: 10.9 },
                    Y: { Summer: 10.6, Winter: 12.6 },
                    Z: { Summer:  6.2, Winter:  9.0 },
                },
                code_h: {
                    P: { Summer: 16.4, Winter: 29.6 },
                    Q: { Summer:  8.3, Winter: 29.6 },
                    R: { Summer: 18.8, Winter: 29.8 },
                    S: { Summer: 16.4, Winter: 27.1 },
                    T: { Summer:  8.3, Winter: 14.9 },
                    V: { Summer: 13.6, Winter: 26.6 },
                    W: { Summer: 20.8, Winter: 20.6 },
                    X: { Summer:  9.3, Winter: 16.7 },
                    Y: { Summer: 13.0, Winter: 27.1 },
                    Z: { Summer:  7.7, Winter: 18.7 },
                },
            },
            prices: {
                'Summer Peak': [
                    { end: 1,        rate: 37804 },
                    { end: 1.3,      rate: 42136 },
                    { end: 2,        rate: 48232 },
                    {                rate: 56043 },
                ],
                'Summer Off Peak' : [
                    { end: 1,        rate: 12989 },
                    { end: 1.3,      rate: 17320 },
                    { end: 2,        rate: 23417 },
                    {                rate: 31228 },
                ],
                'Winter Peak': [
                    { end: 1,        rate: 16354 },
                    { end: 1.3,      rate: 20685 },
                    { end: 2,        rate: 26782 },
                    {                rate: 34593 },
                ],
                'Winter Off Peak': [
                    { end: 1,        rate: 13350 },
                    { end: 1.3,      rate: 17681 },
                    { end: 2,        rate: 23778 },
                    {                rate: 31589 },
                ],
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
                    Q: { Summer:  7.0, Winter: 12.3 },
                    R: { Summer: 15.6, Winter: 11.0 },
                    S: { Summer: 13.8, Winter: 11.2 },
                    T: { Summer:  7.0, Winter:  8.5 },
                    V: { Summer:  8.7, Winter: 10.6 },
                    W: { Summer: 16.8, Winter: 10.1 },
                    X: { Summer: 10.1, Winter: 10.9 },
                    Y: { Summer: 10.6, Winter: 12.6 },
                    Z: { Summer:  6.2, Winter:  9.0 },
                },
                code_h: {
                    P: { Summer: 16.4, Winter: 29.6 },
                    Q: { Summer:  8.3, Winter: 29.6 },
                    R: { Summer: 18.8, Winter: 29.8 },
                    S: { Summer: 16.4, Winter: 27.1 },
                    T: { Summer:  8.3, Winter: 14.9 },
                    V: { Summer: 13.6, Winter: 26.6 },
                    W: { Summer: 20.8, Winter: 20.6 },
                    X: { Summer:  9.3, Winter: 16.7 },
                    Y: { Summer: 13.0, Winter: 27.1 },
                    Z: { Summer:  7.7, Winter: 18.7 },
                },
            },
            prices: {
                'Summer Peak': [
                    { end: 1,        rate: 36539 },
                    { end: 1.3,      rate: 39998 },
                    { end: 2,        rate: 49112 },
                    {                rate: 56599 },
                ],
                'Summer Partial Peak' : [
                    { end: 1,        rate: 15001 },
                    { end: 1.3,      rate: 18459 },
                    { end: 2,        rate: 27575 },
                    {                rate: 35061 },
                ],
                'Summer Off Peak' : [
                    { end: 1,        rate:  8495 },
                    { end: 1.3,      rate: 11954 },
                    { end: 2,        rate: 12523 },
                    {                rate: 20009 },
                ],
                'Winter Partial Peak': [
                    { end: 1,        rate: 14989 },
                    { end: 1.3,      rate: 18446 },
                    { end: 2,        rate: 27562 },
                    {                rate: 35048 },
                ],
                'Winter Off Peak': [
                    { end: 1,        rate:  9489 },
                    { end: 1.3,      rate: 12946 },
                    { end: 2,        rate: 12522 },
                    {                rate: 20009 },
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
                    { rate: 44402 },
                ],
                'Summer Partial Peak' : [
                    { rate: 24156 },
                ],
                'Summer Off Peak' : [
                    { rate: 11466 },
                ],
                'Winter Peak': [
                    { rate: 31228 },
                ],
                'Winter Partial Peak': [
                    { rate: 19043 },
                ],
                'Winter Off Peak': [
                    { rate: 11742 },
                ],
            },
        },
        'E-TOU A': {
            schedule: [
                { start_cal: { month: 'June', day: 1 }, end_cal: { month: 'October', day: 31 }, start_day: 'Monday', end_day: 'Friday', start_time: 15, end_time: 20, type: 'Summer Peak' },

                { start_cal: { month: 'June', day: 1 }, end_cal: { month: 'October', day: 31 }, type: 'Summer Off Peak' },

                { start_cal: { month: 'November', day: 1 }, end_cal: { month: 'December', day: 31 }, start_day: 'Monday', end_day: 'Friday', start_time: 15, end_time: 20, type: 'Winter Peak' },
                { start_cal: { month: 'January', day: 1 }, end_cal: { month: 'May', day: 31 }, start_day: 'Monday', end_day: 'Friday', start_time: 15, end_time: 20, type: 'Winter Peak' },

                { type: 'Winter Off Peak' },
            ],
            prices: {
                'Summer Peak': [
                    { end: 1,        rate: 40227 - 11608 },
                    {                rate: 40227 },
                ],
                'Summer Off Peak' : [
                    { end: 1,        rate: 32669 - 11608 },
                    {                rate: 32669 },
                ],
                'Winter Peak': [
                    { end: 1,        rate: 28430 - 11608 },
                    {                rate: 28430 },
                ],
                'Winter Off Peak': [
                    { end: 1,        rate: 27000 - 11608 },
                    {                rate: 27000 },
                ],
            },
            baselines: {
                code_b: {
                    P: { Summer: 13.8, Winter: 12.3 },
                    Q: { Summer:  7.0, Winter: 12.3 },
                    R: { Summer: 15.6, Winter: 11.0 },
                    S: { Summer: 13.8, Winter: 11.2 },
                    T: { Summer:  7.0, Winter:  8.5 },
                    V: { Summer:  8.7, Winter: 10.6 },
                    W: { Summer: 16.8, Winter: 10.1 },
                    X: { Summer: 10.1, Winter: 10.9 },
                    Y: { Summer: 10.6, Winter: 12.6 },
                    Z: { Summer:  6.2, Winter:  9.0 },
                },
                code_h: {
                    P: { Summer: 16.4, Winter: 29.6 },
                    Q: { Summer:  8.3, Winter: 29.6 },
                    R: { Summer: 18.8, Winter: 29.8 },
                    S: { Summer: 16.4, Winter: 27.1 },
                    T: { Summer:  8.3, Winter: 14.9 },
                    V: { Summer: 13.6, Winter: 26.6 },
                    W: { Summer: 20.8, Winter: 20.6 },
                    X: { Summer:  9.3, Winter: 16.7 },
                    Y: { Summer: 13.0, Winter: 27.1 },
                    Z: { Summer:  7.7, Winter: 18.7 },
                },
            },
        },
        'E-TOU B': {
            schedule: [
                { start_cal: { month: 'June', day: 1 }, end_cal: { month: 'October', day: 31 }, start_day: 'Monday', end_day: 'Friday', start_time: 16, end_time: 21, type: 'Summer Peak' },

                { start_cal: { month: 'June', day: 1 }, end_cal: { month: 'October', day: 31 }, type: 'Summer Off Peak' },

                { start_cal: { month: 'November', day: 1 }, end_cal: { month: 'December', day: 31 }, start_day: 'Monday', end_day: 'Friday', start_time: 16, end_time: 21, type: 'Winter Peak' },
                { start_cal: { month: 'January', day: 1 }, end_cal: { month: 'May', day: 31 }, start_day: 'Monday', end_day: 'Friday', start_time: 16, end_time: 21, type: 'Winter Peak' },

                { type: 'Winter Off Peak' },
            ],
            prices: {
                'Summer Peak': [
                    { rate: 35600 },
                ],
                'Summer Off Peak' : [
                    { rate: 21854 },
                ],
                'Winter Peak': [
                    { rate: 25294 },
                ],
                'Winter Off Peak': [
                    { rate: 19974 },
                ],
            },

        },
    },
    enumerable: true,
    writable: false,
    configurable: false,
});

