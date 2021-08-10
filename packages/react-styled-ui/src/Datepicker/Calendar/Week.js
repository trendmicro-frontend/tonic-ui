import React from 'react';
import PropTypes from 'prop-types';
import Day from './Day';

const Week = ({
  getDays,
  renderDate,
  selectedDateStr,
  onSelectHandler,
}) => (
  <>
    {getDays({ ...renderDate, selectedDateStr }).map(
      ({ isToday, ...dateInfo }) => {
        const dateInfoStr = Object.values(dateInfo).join('-');
        return (
          <Day
            key={dateInfoStr}
            date={dateInfo.date}
            dateInfoStr={dateInfoStr}
            isSelected={selectedDateStr && selectedDateStr === dateInfoStr}
            isToday={isToday}
            isThisMonth={renderDate.month === dateInfo.month}
            onSelectHandler={onSelectHandler}
          />
        );
      }
    )}
  </>
);

Week.propTypes = {
  getDays: PropTypes.func.isRequired,
  renderDate: PropTypes.object.isRequired,
  selectedDateStr: PropTypes.string,
  onSelectHandler: PropTypes.func.isRequired,
};

Week.defaultProps = {
  selectedDateStr: '',
};


export default Week;
