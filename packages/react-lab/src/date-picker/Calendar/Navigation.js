import {
  Button,
  Flex,
  Icon,
} from '@tonic-ui/react';
import addMonths from 'date-fns/addMonths';
import addYears from 'date-fns/addYears';
import startOfMonth from 'date-fns/startOfMonth';
import startOfYear from 'date-fns/startOfYear';
import subMonths from 'date-fns/subMonths';
import subYears from 'date-fns/subYears';
import React, { forwardRef } from 'react';

const Navigation = forwardRef((
  {
    activeDate,
    locale,
    view,
    setActiveDate,
    setView,
    ...props
  },
  ref,
) => {
  return (
    <Flex
      ref={ref}
      flex="none"
      mb="3x"
      {...props}
    >
      <PreviousButton
        activeDate={activeDate}
        view={view}
        setActiveDate={setActiveDate}
      />
      <Title
        activeDate={activeDate}
        locale={locale}
        view={view}
        setActiveDate={setActiveDate}
        setView={setView}
      />
      <NextButton
        activeDate={activeDate}
        view={view}
        setActiveDate={setActiveDate}
      />
    </Flex>
  );
});

const Title = ({
  activeDate,
  locale,
  view,
  setActiveDate,
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
  })(activeDate);

  const views = ['decade', 'year', 'month'];
  const handleClick = (e) => {
    const nextViewIndex = views.indexOf(view) - 1;
    const nextView = views[nextViewIndex < 0 ? 0 : nextViewIndex];
    const nextActiveStartDate = {
      'decade': startOfYear(activeDate),
      'year': startOfYear(activeDate),
      'month': startOfMonth(activeDate),
    }[nextView];
    setView(nextView);
    setActiveDate(nextActiveStartDate);
  };

  return (
    <Button
      variant="ghost"
      flexGrow={1}
      fontSize="md"
      lineHeight="md"
      onClick={handleClick}
    >
      { label }
    </Button>
  );
};

const PreviousButton = ({
  activeDate,
  view,
  setActiveDate,
}) => {
  const handleClick = (e) => {
    const nextActiveStartDate = {
      'decade': subYears(activeDate, 10),
      'year': subYears(activeDate, 1),
      'month': subMonths(activeDate, 1),
    }[view];
    setActiveDate(nextActiveStartDate);
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
  activeDate,
  view,
  setActiveDate,
}) => {
  const handleClick = (e) => {
    const nextActiveStartDate = {
      'decade': addYears(activeDate, 10),
      'year': addYears(activeDate, 1),
      'month': addMonths(activeDate, 1),
    }[view];
    setActiveDate(nextActiveStartDate);
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
