import addMonths from 'date-fns/addMonths';
import addYears from 'date-fns/addYears';
import startOfMonth from 'date-fns/startOfMonth';
import startOfYear from 'date-fns/startOfYear';
import subMonths from 'date-fns/subMonths';
import subYears from 'date-fns/subYears';
import React, { forwardRef } from 'react';
import Button from '../../Button';
import Box from '../../Box';
import Icon from '../../Icon';

const Navigation = forwardRef((
  {
    activeStartDate,
    locale,
    view,

    // handlers
    setActiveStartDate,
    setView,

    ...rest
  },
  ref,
) => {
  return (
    <Box
      ref={ref}
      display="flex"
      {...rest}
    >
      <PreviousButton
        activeStartDate={activeStartDate}
        view={view}
        setActiveStartDate={setActiveStartDate}
      />
      <Title
        activeStartDate={activeStartDate}
        locale={locale}
        view={view}
        setActiveStartDate={setActiveStartDate}
        setView={setView}
      />
      <NextButton
        activeStartDate={activeStartDate}
        view={view}
        setActiveStartDate={setActiveStartDate}
      />
    </Box>
  );
});

const Title = ({
  activeStartDate,
  locale,
  view,
  setActiveStartDate,
  setView,
}) => {
  const label = ((date) => {
    if (view === 'decade') {
      const startYear = date.toLocaleDateString(locale, { year: 'numeric' });
      const endYear = addYears(date, 9).toLocaleDateString(locale, { year: 'numeric' });
      return `${startYear} - ${endYear}`;
    }
    if (view === 'year') {
      return date.toLocaleDateString(locale, { year: 'numeric' });
    }
    if (view === 'month') {
      return date.toLocaleDateString(locale, { month: 'long', year: 'numeric' });
    }
    throw new Error(`Invalid view: ${view}.`);
  })(activeStartDate);

  const views = ['decade', 'year', 'month'];
  const handleClick = (e) => {
    const nextViewIndex = views.indexOf(view) - 1;
    const nextView = views[nextViewIndex < 0 ? 0 : nextViewIndex];
    const nextActiveStartDate = {
      'decade': startOfYear(activeStartDate),
      'year': startOfYear(activeStartDate),
      'month': startOfMonth(activeStartDate),
    }[nextView];
    setView(nextView);
    setActiveStartDate(nextActiveStartDate);
  };

  return (
    <Button
      variant="ghost"
      onClick={handleClick}
      flexGrow={1}
    >
      { label }
    </Button>
  );
};

const PreviousButton = ({
  activeStartDate,
  view,
  setActiveStartDate,
}) => {
  const handleClick = (e) => {
    const nextActiveStartDate = {
      'decade': subYears(activeStartDate, 10),
      'year': subYears(activeStartDate, 1),
      'month': subMonths(activeStartDate, 1),
    }[view];
    setActiveStartDate(nextActiveStartDate);
  };

  return (
    <Button
      variant="ghost"
      width="8x"
      onClick={handleClick}
    >
      <Icon icon="angle-left" />
    </Button>
  );
};

const NextButton = ({
  activeStartDate,
  view,
  setActiveStartDate,
}) => {
  const handleClick = (e) => {
    const nextActiveStartDate = {
      'decade': addYears(activeStartDate, 10),
      'year': addYears(activeStartDate, 1),
      'month': addMonths(activeStartDate, 1),
    }[view];
    setActiveStartDate(nextActiveStartDate);
  };

  return (
    <Button
      variant="ghost"
      width="8x"
      onClick={handleClick}
    >
      <Icon icon="angle-right" />
    </Button>
  );
};

Navigation.displayName = 'Navigation';

export default Navigation;
