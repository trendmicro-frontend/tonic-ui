import React, { forwardRef } from 'react';
import Button from '../../../Button';
import {
  useCellStyle,
} from '../../styles';

const Month = forwardRef((
  {
    date,
    locale = 'en',
    onClick,
    ...rest
  },
  ref,
) => {
  const styleProps = useCellStyle({});
  const abbr = date.toLocaleDateString(locale, { month: 'long', year: 'numeric' });
  const label = date.toLocaleDateString(locale, { month: 'long' });
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
      <abbr aria-label={abbr}>
        {label}
      </abbr>
    </Button>
  );
});

Month.displayName = 'Month';

export default Month;
