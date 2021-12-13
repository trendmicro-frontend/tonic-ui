import getDate from 'date-fns/getDate';
import React, { forwardRef } from 'react';
import Button from '../../../Button';
import { useCellStyle } from '../../styles';

const Day = forwardRef((
  {
    date,
    locale,
    onClick,
    ...rest
  },
  ref,
) => {
  const styleProps = useCellStyle({});
  const handleClick = (e) => {
    if (typeof onClick !== 'function') {
      return;
    }
    onClick(date);
  };

  return (
    <Button
      ref={ref}
      variant="ghost"
      onClick={handleClick}
      {...styleProps}
      {...rest}
    >
      { getDate(date) }
    </Button>
  );
});

Day.displayName = 'Day';

export default Day;
