import _ from 'lodash';
import moment from 'moment';

export const getYearOptions = () => {
  const currentYear = moment().year();
  return _.range(currentYear - 10, currentYear + 10).map((year) => ({
    label: `Năm ${year}`,
    value: year,
  }));
};
