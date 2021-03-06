var covid19ImpactEstimator = function covid19ImpactEstimator(data) {
  var _data$region = data.region,
      avgDailyIncomeInUSD = _data$region.avgDailyIncomeInUSD,
      avgDailyIncomePopulation = _data$region.avgDailyIncomePopulation,
      periodType = data.periodType,
      reportedCases = data.reportedCases,
      totalHospitalBeds = data.totalHospitalBeds;
  var timeToElapse = data.timeToElapse;


  if (periodType === 'days') {
    timeToElapse *= 1;
  } else if (periodType === 'weeks') {
    timeToElapse *= 7;
  } else if (periodType === 'months') {
    timeToElapse *= 30;
  }

  var infected = function infected(currentlyInfected) {
    var factor = Math.trunc(timeToElapse / 3);
    return currentlyInfected * Math.pow(2, factor);
  };

  var availableBeds = function availableBeds(severeCasesByRequestedTime) {
    var bedsAvailable = Math.trunc(totalHospitalBeds * 0.35);
    return bedsAvailable - severeCasesByRequestedTime;
  };

  var avgIncomeInUSD = function avgIncomeInUSD(infectionsByRequestedTime) {
    var infections = infectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncomeInUSD;
    return Math.trunc(infections / timeToElapse);
  };

  // *************************************IMPACT STARTS*********************************************
  var impact = {};
  impact.currentlyInfected = reportedCases * 10;

  impact.infectionsByRequestedTime = infected(impact.currentlyInfected);

  impact.severeCasesByRequestedTime = impact.infectionsByRequestedTime * 0.15;

  impact.hospitalBedsByRequestedTime = availableBeds(impact.severeCasesByRequestedTime);

  impact.casesForICUByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * 0.05);

  impact.casesForVentilatorsByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * 0.02);

  impact.dollarsInFlight = avgIncomeInUSD(impact.infectionsByRequestedTime);
  // ************************************IMPACT ENDS************************************************


  // ***********************************SEVERE IMPACT STARTS****************************************
  var severeImpact = {};
  severeImpact.currentlyInfected = reportedCases * 50;

  severeImpact.infectionsByRequestedTime = infected(severeImpact.currentlyInfected);

  severeImpact.severeCasesByRequestedTime = severeImpact.infectionsByRequestedTime * 0.15;

  severeImpact.hospitalBedsByRequestedTime = availableBeds(severeImpact.severeCasesByRequestedTime);

  severeImpact.casesForICUByRequestedTime = Math.trunc(severeImpact.infectionsByRequestedTime * 0.05);

  severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(severeImpact.infectionsByRequestedTime * 0.02);

  severeImpact.dollarsInFlight = avgIncomeInUSD(severeImpact.infectionsByRequestedTime);
  // ***********************************SEVERE IMPACT ENDS******************************************
  return {
    data: data,
    impact: impact,
    severeImpact: severeImpact
  };
};

export default covid19ImpactEstimator;