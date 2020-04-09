import inputData from './inputData';
import impact from './impact';
import severeImpact from './severeImpact';

const data = {
  data: { inputData },
  impact: { impact },
  severeImpact: { severeImpact }
};

const covid19ImpactEstimator = () => data;

export default covid19ImpactEstimator;
