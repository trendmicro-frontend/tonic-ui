import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
} from '@tonic-ui/react';
import addMonths from 'date-fns/addMonths';
import addYears from 'date-fns/addYears';
import format from 'date-fns/format';
import subMonths from 'date-fns/subMonths';
import subYears from 'date-fns/subYears';
import React, { forwardRef } from 'react';
import useCalendar from './useCalendar';
import {
  useNavigationStyle,
  useNavigationTitleStyle,
  useNavigationMonthButtonStyle,
  useNavigationYearButtonStyle,
  useNavigationYearButtonWrapperStyle,
} from './styles';

const Navigation = forwardRef((
  props,
  ref,
) => {
  const calendarContext = useCalendar();
  const {
    activeDate,
    setActiveDate,
  } = { ...calendarContext };

  const handlePreviousYearClick = () => {
    const nextActiveDate = subYears(activeDate, 1);
    setActiveDate(nextActiveDate);
  };
  const handleNextYearClick = () => {
    const nextActiveDate = addYears(activeDate, 1);
    setActiveDate(nextActiveDate);
  };
  const handlePreviousMonthClick = () => {
    const nextActiveDate = subMonths(activeDate, 1);
    setActiveDate(nextActiveDate);
  };
  const handleNextMonthClick = () => {
    const nextActiveDate = addMonths(activeDate, 1);
    setActiveDate(nextActiveDate);
  };

  const styleProps = useNavigationStyle();

  return (
    <Flex
      ref={ref}
      {...styleProps}
      {...props}
    >
      <PreviousMonthButton onClick={handlePreviousMonthClick} />
      <Title
        activeDate={activeDate}
        onPreviousYearClick={handlePreviousYearClick}
        onNextYearClick={handleNextYearClick}
      />
      <NextMonthButton onClick={handleNextMonthClick} />
    </Flex>
  );
});

const Title = ({
  activeDate,
  onPreviousYearClick,
  onNextYearClick,
}) => {
  const titleStyleProps = useNavigationTitleStyle();
  const yearButtonStyleProps = useNavigationYearButtonStyle();
  const yearButtonWrapperStyleProps = useNavigationYearButtonWrapperStyle();

  return (
    <Box
      {...titleStyleProps}
    >
      <Text>{format(activeDate, 'LLL yyyy')}</Text>
      <Box
        {...yearButtonWrapperStyleProps}
      >
        <Button
          variant="ghost"
          onClick={onPreviousYearClick}
          {...yearButtonStyleProps}
        >
          <Icon icon="angle-up" />
        </Button>
        <Button
          variant="ghost"
          onClick={onNextYearClick}
          {...yearButtonStyleProps}
        >
          <Icon icon="angle-down" />
        </Button>
      </Box>
    </Box>
  );
};

const PreviousMonthButton = ({
  onClick,
}) => {
  const styleProps = useNavigationMonthButtonStyle();

  return (
    <Button
      variant="ghost"
      onClick={onClick}
      {...styleProps}
    >
      <Icon icon="angle-left" />
    </Button>
  );
};

const NextMonthButton = ({
  onClick,
}) => {
  const styleProps = useNavigationMonthButtonStyle();

  return (
    <Button
      variant="ghost"
      onClick={onClick}
      {...styleProps}
    >
      <Icon icon="angle-right" />
    </Button>
  );
};

Navigation.displayName = 'Navigation';

export default Navigation;
