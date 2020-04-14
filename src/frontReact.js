import React, { useState } from "react"
import ReactDOM from 'react-dom';
import covid19ImpactEstimator from './estimator.js'

const FrondEnd = () => {

  const handleSubmit = event => {
    event.preventDefault();

    const data = {
        region: {
          name: "Africa",
          avgAge: 19.7,
          avgDailyIncomeInUSD: 5,
          avgDailyIncomePopulation: 0.71,
        },
        periodType: periodType,
        timeToElapse: parseInt(timeToElapse),
        reportedCases: parseInt(reportedCases),
        population: parseInt(population),
        totalHospitalBeds: parseInt(totalHospitalBeds),
    }
    console.log(covid19ImpactEstimator(data));

    alert(JSON.stringify(covid19ImpactEstimator(data),null,3))
  }

  const [population, setPopulation] = useState(0)
  const [timeToElapse, setTimeToElapse] = useState(0)
  const [reportedCases, setReportedCases] = useState(0)
  const [totalHospitalBeds, setTotalHospitalBeds] = useState(0)
  const [periodType, setPeriodType] = useState('')

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <h1>COVID-19 estimator</h1>
            <p>Please fill in this form to find infection rate in AFRICA.</p>
            <hr />

            <input 
                type="number" placeholder="POPULATION" name="population"
                data-population required 
                onChange={(event) => setPopulation(event.target.value)} 
            />
            <input 
                type="number" placeholder="ELAPSE TIME" 
                name="data-time-to-elapse" required
                data-time-to-elapse
                onChange={(event) => setTimeToElapse(event.target.value)} 
            />
            <input 
                type="number" placeholder="REPORTED CASES"
                name="data-reported-cases" required
                data-reported-cases
                onChange={(event) => setReportedCases(event.target.value)}
            />
            <input 
                type="number" placeholder="TOTAL HOSPITAL BEDS"
                name="data-total-hospital-beds" required
                data-total-hospital-beds
                onChange={(event) => setTotalHospitalBeds(event.target.value)}
            />
                
            <label> CHOOSE PERIOD TYPE:
                <select
                    id="data-period-type" data-period-type
                    onChange={(event) => setPeriodType(event.target.value)}>
                        <option>-- select one --</option>
                        <option value="days">Days</option>
                        <option value="weeks">Weeks</option>
                        <option value="months">Months</option>
                </select>
            </label>
            <button id="data-go-estimate" data-go-estimate> Submit </button>
        </form>
    
    </div>
  )
}

ReactDOM.render(FrondEnd, document.getElementById('root'));
