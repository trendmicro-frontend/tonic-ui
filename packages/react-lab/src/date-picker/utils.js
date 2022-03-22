import format from 'date-fns/format';

const dateFormatter = ({
  date,
  dateFormat = 'yyyy-MM-dd',
}) => {
  if (!date) {
    return '';
  }
  if (typeof date === 'string') {
    date = toDate(date);
  }
  if (isDate(date)) {
    return format(date, dateFormat);
  }
  return '';
};

const isDate = (v) => {
  const d = new Date(v);
  return !Number.isNaN(d.getTime());
};

const toDate = (v) => {
  if (!v) {
    return null;
  }
  return new Date(v);
};

export {
  dateFormatter,
  toDate,
  isDate,
};
