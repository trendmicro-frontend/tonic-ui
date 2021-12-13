import React from 'react';
import Years from './Years';

const DecadeView = ({
  activeStartDate,
  locale,

  // handlers
  setActiveStartDate,
  setView,
}) => {
  const handleClickYear = (date) => {
    setActiveStartDate(date);
    setView('year');
  };

  return (
    <Years
      date={activeStartDate}
      locale={locale}
      onClickYear={handleClickYear}
    />
  );
};

DecadeView.displayName = 'DecadeView';

export default DecadeView;
