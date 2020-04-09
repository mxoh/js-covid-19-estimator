import inputData from './inputData';

const numOfDays = null;

// calculate infection rate on a specific period
const infectionRate = (days) => (2 ** (days / 3));

// calculate daily average income on a specific period
const avgIncomeInUSD = (days) => inputData.region.avgDailyIncomeInUSD * days;

// calculate the majority avgDailyIncomePopulation
const majority = (infected) => inputData.region.avgDailyIncomePopulation * infected;

const impact = {
  currentlyInfected: inputData.reportedCases * 10,
  infectionsByRequestedTime: this.currentlyInfected * infectionRate(numOfDays),
  severeCasesByRequestedTime: Math.ceil(this.infectionsByRequestedTime * 0.15),
  hospitalBedsByRequestedTime: Math.ceil(inputData.totalHospitalBeds * 0.35),
  casesForICUByRequestedTime: Math.ceil(this.infectionsByRequestedTime * 0.05),
  casesForVentilatorsByRequestedTime: Math.ceil(this.infectionsByRequestedTime * 0.02),
  dollarsInFlight: (majority(this.infectionsByRequestedTime)) * avgIncomeInUSD(numOfDays)
};

export default impact;
