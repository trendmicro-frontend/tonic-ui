import React from 'react';
import PropTypes from 'prop-types';

import PseudoBox from '../../PseudoBox';

import { useDaysStyle } from './styles';

const Day = ({
  date,
  dateInfoStr,
  isSelected,
  isToday,
  isThisMonth,
  onSelectHandler,
}) => {
  const styleProps = useDaysStyle({ isSelected, isToday, isThisMonth });

  return (
    <PseudoBox
      onClick={() => onSelectHandler(dateInfoStr)}
      {...styleProps}
    >
      {date}
    </PseudoBox>
  );
};
Day.propTypes = {
  date: PropTypes.number.isRequired,
  dateInfoStr: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isToday: PropTypes.bool.isRequired,
  isThisMonth: PropTypes.bool.isRequired,
  onSelectHandler: PropTypes.func.isRequired,
};

export default Day;
