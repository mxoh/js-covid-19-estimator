var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { useState } from "react";
import ReactDOM from 'react-dom';
import covid19ImpactEstimator from './estimator.js';

var FrondEnd = function FrondEnd() {

    var handleSubmit = function handleSubmit(event) {
        event.preventDefault();

        var data = {
            region: {
                name: "Africa",
                avgAge: 19.7,
                avgDailyIncomeInUSD: 5,
                avgDailyIncomePopulation: 0.71
            },
            periodType: periodType,
            timeToElapse: parseInt(timeToElapse),
            reportedCases: parseInt(reportedCases),
            population: parseInt(population),
            totalHospitalBeds: parseInt(totalHospitalBeds)
        };
        console.log(covid19ImpactEstimator(data));

        alert(JSON.stringify(covid19ImpactEstimator(data), null, 3));
    };

    var _useState = useState(0),
        _useState2 = _slicedToArray(_useState, 2),
        population = _useState2[0],
        setPopulation = _useState2[1];

    var _useState3 = useState(0),
        _useState4 = _slicedToArray(_useState3, 2),
        timeToElapse = _useState4[0],
        setTimeToElapse = _useState4[1];

    var _useState5 = useState(0),
        _useState6 = _slicedToArray(_useState5, 2),
        reportedCases = _useState6[0],
        setReportedCases = _useState6[1];

    var _useState7 = useState(0),
        _useState8 = _slicedToArray(_useState7, 2),
        totalHospitalBeds = _useState8[0],
        setTotalHospitalBeds = _useState8[1];

    var _useState9 = useState(''),
        _useState10 = _slicedToArray(_useState9, 2),
        periodType = _useState10[0],
        setPeriodType = _useState10[1];

    return React.createElement(
        'div',
        null,
        React.createElement(
            'form',
            { onSubmit: handleSubmit },
            React.createElement(
                'h1',
                null,
                'COVID-19 estimator'
            ),
            React.createElement(
                'p',
                null,
                'Please fill in this form to find infection rate in AFRICA.'
            ),
            React.createElement('hr', null),
            React.createElement('input', {
                type: 'number', placeholder: 'POPULATION', name: 'population',
                'data-population': true, required: true,
                onChange: function onChange(event) {
                    return setPopulation(event.target.value);
                }
            }),
            React.createElement('input', {
                type: 'number', placeholder: 'ELAPSE TIME',
                name: 'data-time-to-elapse', required: true,
                onChange: function onChange(event) {
                    return setTimeToElapse(event.target.value);
                }
            }),
            React.createElement('input', {
                type: 'number', placeholder: 'REPORTED CASES',
                name: 'data-reported-cases', required: true,
                onChange: function onChange(event) {
                    return setReportedCases(event.target.value);
                }
            }),
            React.createElement('input', {
                type: 'number', placeholder: 'TOTAL HOSPITAL BEDS',
                name: 'data-total-hospital-beds', required: true,
                onChange: function onChange(event) {
                    return setTotalHospitalBeds(event.target.value);
                }
            }),
            React.createElement(
                'label',
                null,
                ' CHOOSE PERIOD TYPE:',
                React.createElement(
                    'select',
                    {
                        id: 'data-period-type', 'data-period-type': true,
                        onChange: function onChange(event) {
                            return setPeriodType(event.target.value);
                        } },
                    React.createElement(
                        'option',
                        null,
                        '-- select one --'
                    ),
                    React.createElement(
                        'option',
                        { value: 'days' },
                        'Days'
                    ),
                    React.createElement(
                        'option',
                        { value: 'weeks' },
                        'Weeks'
                    ),
                    React.createElement(
                        'option',
                        { value: 'months' },
                        'Months'
                    )
                )
            ),
            React.createElement(
                'button',
                { id: 'data-go-estimate', 'data-go-estimate': true },
                ' Submit '
            )
        )
    );
};

ReactDOM.render(FrondEnd, document.getElementById('root'));