import React from 'react';
import PropTypes from 'prop-types';
import Day from './Day';

import { getTimestamp } from '../utils';

const Week = ({
  getDays,
  renderDate,
  maxTimestamp,
  minTimestamp,
  selectedDateStr,
  onSelectHandler,
}) => {
  const checkInScope = (timestamp, max, min) => {
    if (max && min) {
      return timestamp >= min && timestamp <= max;
    }
    if (max) {
      return timestamp <= max;
    }
    if (min) {
      return timestamp >= min;
    }
    return true;
  };

  return getDays({ ...renderDate }).map(
    ({ isToday, ...dateInfo }) => {
      const dateInfoStr = Object.values(dateInfo).join('-');
      const dateInfoTimestamp = getTimestamp(dateInfoStr);
      const isOutOfScope = !checkInScope(dateInfoTimestamp, maxTimestamp, minTimestamp);
      return (
        <Day
          key={dateInfoStr}
          date={dateInfo.date}
          dateInfoStr={dateInfoStr}
          isSelected={selectedDateStr && selectedDateStr === dateInfoStr}
          isToday={isToday}
          isThisMonth={renderDate.month === dateInfo.month}
          isOutOfScope={isOutOfScope}
          onSelectHandler={onSelectHandler}
        />
      );
    }
  );
};

Week.propTypes = {
  getDays: PropTypes.func.isRequired,
  renderDate: PropTypes.object.isRequired,
  selectedDateStr: PropTypes.string,
  onSelectHandler: PropTypes.func.isRequired,
  maxTimestamp: PropTypes.number.isRequired,
  minTimestamp: PropTypes.number.isRequired,
};

Week.defaultProps = {
  selectedDateStr: ''
};


export default Week;
