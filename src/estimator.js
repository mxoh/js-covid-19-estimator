const covid19ImpactEstimator = (data) => {
  const {
    region: { avgDailyIncomeInUSD, avgDailyIncomePopulation },
    periodType, reportedCases, totalHospitalBeds
  } = data;

  let { timeToElapse } = data;

  if (periodType === 'months') {
    timeToElapse = Math.trunc(timeToElapse * 30);
  } else if (periodType === 'weeks') {
    timeToElapse = Math.trunc(timeToElapse * 7);
  } else if (periodType === 'days') {
    timeToElapse = Math.trunc(timeToElapse);
  }

  const infected = (currentlyInfected) => {
    const factor = Math.trunc(timeToElapse / 3);
    return currentlyInfected * 2 ** factor;
  };

  const availableBeds = (severeCasesByRequestedTime) => {
    const bedsAvailable = totalHospitalBeds * 0.35;
    return Math.trunc(bedsAvailable - severeCasesByRequestedTime);
  };

  const avgIncomeInUSD = (infectionsByRequestedTime) => {
    const infections = infectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncomeInUSD;
    return Math.trunc(infections / timeToElapse);
  };

  // *************************************IMPACT STARTS*********************************************
  const impact = {};
  impact.currentlyInfected = reportedCases * 10;

  impact.infectionsByRequestedTime = infected(impact.currentlyInfected);

  impact.severeCasesByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * 0.15);

  impact.hospitalBedsByRequestedTime = availableBeds(impact.severeCasesByRequestedTime);

  impact.casesForICUByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * 0.05);

  impact.casesForVentilatorsByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * 0.02);

  impact.dollarsInFlight = avgIncomeInUSD(impact.infectionsByRequestedTime);
  // ************************************IMPACT ENDS************************************************


  // ***********************************SEVERE IMPACT STARTS****************************************
  const severeImpact = {};
  severeImpact.currentlyInfected = reportedCases * 50;

  severeImpact.infectionsByRequestedTime = infected(severeImpact.currentlyInfected);

  severeImpact.severeCasesByRequestedTime = Math.trunc(
    severeImpact.infectionsByRequestedTime * 0.15
  );

  severeImpact.hospitalBedsByRequestedTime = availableBeds(severeImpact.severeCasesByRequestedTime);

  severeImpact.casesForICUByRequestedTime = Math.trunc(
    severeImpact.infectionsByRequestedTime * 0.05
  );

  severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(
    severeImpact.infectionsByRequestedTime * 0.02
  );

  severeImpact.dollarsInFlight = avgIncomeInUSD(severeImpact.infectionsByRequestedTime);
  // ***********************************SEVERE IMPACT ENDS******************************************
  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
