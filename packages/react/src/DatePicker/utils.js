const dateFormatter = ({
  date,
  format = { day: 'numeric', month: 'numeric', year: 'numeric' },
  locale,
}) => {
  if (!date) {
    return '';
  }
  if (typeof date === 'string') {
    date = toDate(date);
  }
  if (isDate(date)) {
    return date.toLocaleDateString(locale, format);
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
