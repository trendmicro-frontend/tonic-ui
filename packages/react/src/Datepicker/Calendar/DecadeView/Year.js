import React, { forwardRef } from 'react';
import Button from '../../../Button';
import {
  useCellStyle,
} from '../../styles';

const Year = forwardRef((
  {
    date,
    locale,
    onClick,
    ...rest
  },
  ref,
) => {
  const styleProps = useCellStyle({});
  const abbr = date.toLocaleDateString(locale, { year: 'numeric' });
  const label = date.toLocaleDateString(locale, { year: 'numeric' });
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

Year.displayName = 'Year';

export default Year;
