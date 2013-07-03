Object.defineProperty(exports, "rates", {
    value : {
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
                    { rate: 0.34025 }
                ],
                'Winter': [
                    { end: 1, rate: 0.13230 },
                    { end: 1.3, rate: 0.15040 },
                    { end: 2, rate: 0.30025 },
                    { rate: 0.34025 }
                ]
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
                    'Z': { 'Summer': 7.9,  'Winter': 10.6 }
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
                    'Z': { 'Summer': 11.2,  'Winter': 22.5 }
                }
            }
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
                    'Z': { 'Summer': 7.9,  'Winter': 10.6 }
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
                    'Z': { 'Summer': 11.2,  'Winter': 22.5 }
                }
            },
            prices: {
                'Summer Peak': [
                    { end: 1, rate: 0.28719 },
                    { end: 1.3, rate: 0.30529 },
                    { end: 2, rate: 0.46623 },
                    { rate: 0.50623 }
                ],
                'Summer Partial Peak' : [
                    { end: 1, rate: 0.17528 },
                    { end: 1.3, rate: 0.19338 },
                    { end: 2, rate: 0.35432 },
                    { rate: 0.39432 }
                ],
                'Summer Off Peak' : [
                    { end: 1, rate: 0.10074 },
                    { end: 1.3, rate: 0.11884 },
                    { end: 2, rate: 0.27978 },
                    { rate: 0.31978 }
                ],
                'Winter Partial Peak': [
                    { end: 1, rate: 0.12129 },
                    { end: 1.3, rate: 0.13939 },
                    { end: 2, rate: 0.30033 },
                    { rate: 0.34033 }
                ],
                'Winter Off Peak': [
                    { end: 1, rate: 0.10495 },
                    { end: 1.3, rate: 0.12305 },
                    { end: 2, rate: 0.28399 },
                    { rate: 0.32399 }
                ]
            }
        },
        E7 : {
            schedule: [
                {start_cal: { month: 'May', day: 1 }, end_cal: { month: 'October', day: 31 }, start_day: 'Monday', end_day: 'Friday', start_time: 12, end_time: 18, type: 'Summer Peak'},

                {start_cal: { month: 'May', day: 1 }, end_cal: { month: 'October', day: 31 }, type: 'Summer Off Peak'},

                {start_cal: { month: 'November', day: 1 }, end_cal: { month: 'December', day: 31 }, start_day: 'Monday', end_day: 'Friday', start_time: 12, end_time: 18, type: 'Winter Peak'},
                {start_cal: { month: 'January', day: 1 }, end_cal: { month: 'April', day: 30 }, start_day: 'Monday', end_day: 'Friday', start_time: 12, end_time: 18, type: 'Winter Peak'},

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
                    'Z': { 'Summer': 7.9,  'Winter': 10.6 }
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
                    'Z': { 'Summer': 11.2,  'Winter': 22.5 }
                }
            },
            prices: {
                'Summer Peak': [
                    { end: 1, rate: 0.32251 },
                    { end: 1.3, rate: 0.34122 },
                    { end: 2, rate: 0.50196 },
                    { rate: 0.54196 }
                ],
                'Summer Off Peak' : [
                    { end: 1, rate: 0.08159 },
                    { end: 1.3, rate: 0.10029 },
                    { end: 2, rate: 0.26103 },
                    { rate: 0.30103 }
                ],
                'Winter Peak': [
                    { end: 1, rate: 0.11426 },
                    { end: 1.3, rate: 0.13296 },
                    { end: 2, rate: 0.29370 },
                    { rate: 0.33370 }
                ],
                'Winter Off Peak': [
                    { end: 1, rate: 0.08510 },
                    { end: 1.3, rate: 0.10380 },
                    { end: 2, rate: 0.26454 },
                    { rate: 0.30454 }
                ]
            }
        },
        E8 : {
            schedule: [
                {start_cal: { month: 'May', day: 1 }, end_cal: { month: 'October', day: 31 }, type: 'Summer'},
                {type: 'Winter'}
            ],
            prices: {
                'Summer': [
                    { end: 1, rate: 0.13668 },
                    { end: 1.3, rate: 0.13668 },
                    { end: 2, rate: 0.29742 },
                    { rate: 0.33742 }
                ],
                'Winter': [
                    { end: 1, rate: 0.08752 },
                    { end: 1.3, rate: 0.08752 },
                    { end: 2, rate: 0.24826 },
                    { rate: 0.28826 }
                ]
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
                    'Z': { 'Summer': 7.9,  'Winter': 10.6 }
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
                    'Z': { 'Summer': 11.2,  'Winter': 22.5 }
                }
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
                    'Z': { 'Summer': 7.9,  'Winter': 10.6 }
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
                    'Z': { 'Summer': 11.2,  'Winter': 22.5 }
                }
            },
            prices: {
                'Summer Peak': [
                    { end: 1, rate: 0.31083 },
                    { end: 1.3, rate: 0.32954 },
                    { end: 2, rate: 0.51124 },
                    { rate: 0.55124 }
                ],
                'Summer Partial Peak' : [
                    { end: 1, rate: 0.10172 },
                    { end: 1.3, rate: 0.12043 },
                    { end: 2, rate: 0.30213 },
                    { rate: 0.34213 }
                ],
                'Summer Off Peak' : [
                    { end: 1, rate: 0.03855 },
                    { end: 1.3, rate: 0.05726 },
                    { end: 2, rate: 0.16056 },
                    { rate: 0.20056 }
                ],
                'Winter Partial Peak': [
                    { end: 1, rate: 0.10160 },
                    { end: 1.3, rate: 0.12029 },
                    { end: 2, rate: 0.30200 },
                    { rate: 0.34200 }
                ],
                'Winter Off Peak': [
                    { end: 1, rate: 0.04820 },
                    { end: 1.3, rate: 0.06690 },
                    { end: 2, rate: 0.16056 },
                    { rate: 0.20056 }
                ]
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
                    { rate: 0.35656 }
                ],
                'Summer Partial Peak' : [
                    { rate: 0.19914 }
                ],
                'Summer Off Peak' : [
                    { rate: 0.09712 }
                ],
                'Winter Peak': [
                    { rate: 0.26694 }
                ],
                'Winter Partial Peak': [
                    { rate: 0.16472 }
                ],
                'Winter Off Peak': [
                    { rate: 0.09930 }
                ]
            }
        }
    },
    enumerable: true,
    writable: false,
    configurable: false
});

