import {
  Button,
  Flex,
  Icon,
} from '@tonic-ui/react';
import addMonths from 'date-fns/addMonths';
import addYears from 'date-fns/addYears';
import format from 'date-fns/format';
import startOfMonth from 'date-fns/startOfMonth';
import startOfYear from 'date-fns/startOfYear';
import subMonths from 'date-fns/subMonths';
import subYears from 'date-fns/subYears';
import React, { forwardRef } from 'react';
import useCalendar from './useCalendar';
import {
  useNavigationStyle,
  useNavigationTitleStyle,
  useNavigationMonthButtonStyle,
} from './styles';

const Navigation = forwardRef((
  props,
  ref,
) => {
  const calendarContext = useCalendar();
  const {
    activeDate,
    view,
    setState,
  } = { ...calendarContext };

  const styleProps = useNavigationStyle();

  return (
    <Flex
      ref={ref}
      {...styleProps}
      {...props}
    >
      <PreviousButton
        activeDate={activeDate}
        view={view}
        setState={setState}
      />
      <Title
        activeDate={activeDate}
        view={view}
        setState={setState}
      />
      <NextButton
        activeDate={activeDate}
        view={view}
        setState={setState}
      />
    </Flex>
  );
});

const Title = ({
  activeDate,
  view,
  setState,
}) => {
  const label = ((date) => {
    if (view === 'decade') {
      const startYear = format(date, 'yyyy');
      const endYear = format(addYears(date, 9), 'yyyy');
      return `${startYear} - ${endYear}`;
    }
    if (view === 'year') {
      return format(date, 'yyyy');
    }
    if (view === 'month') {
      return format(date, 'LLL yyyy');
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
    setState({
      activeDate: nextActiveStartDate,
      view: nextView,
    });
  };

  const styleProps = useNavigationTitleStyle();

  return (
    <Button
      variant="ghost"
      onClick={handleClick}
      {...styleProps}
    >
      {label}
    </Button>
  );
};

const PreviousButton = ({
  activeDate,
  view,
  setState,
}) => {
  const handleClick = (e) => {
    const nextActiveDate = {
      'decade': subYears(activeDate, 10),
      'year': subYears(activeDate, 1),
      'month': subMonths(activeDate, 1),
    }[view];
    setState({ activeDate: nextActiveDate });
  };

  const styleProps = useNavigationMonthButtonStyle();

  return (
    <Button
      variant="ghost"
      onClick={handleClick}
      {...styleProps}
    >
      <Icon icon="angle-left" />
    </Button>
  );
};

const NextButton = ({
  activeDate,
  view,
  setState,
}) => {
  const handleClick = (e) => {
    const nextActiveDate = {
      'decade': addYears(activeDate, 10),
      'year': addYears(activeDate, 1),
      'month': addMonths(activeDate, 1),
    }[view];
    setState({ activeDate: nextActiveDate });
  };

  const styleProps = useNavigationMonthButtonStyle();

  return (
    <Button
      variant="ghost"
      onClick={handleClick}
      {...styleProps}
    >
      <Icon icon="angle-right" />
    </Button>
  );
};

Navigation.displayName = 'Navigation';

export default Navigation;
