import _ from 'lodash';
import moment from 'moment';
import { nanoid } from 'nanoid';

export const getYearOptions = () => {
  const currentYear = moment().year();
  return _.range(currentYear - 10, currentYear + 10).map((year) => ({
    label: `Năm ${year}`,
    value: year,
  }));
};

export const generateID = (
  ids: string[] = [],
  size = 10,
  options: { prefix?: string; suffix?: string } = {}
): string => {
  const id = `${options.prefix ?? ''}${nanoid(size)}${options.suffix ?? ''}`;
  if (ids.includes(id)) return generateID(ids, size, options);
  return id;
};
