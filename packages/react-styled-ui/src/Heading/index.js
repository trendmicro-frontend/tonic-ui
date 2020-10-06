import React, { forwardRef } from 'react';
import Box from '../Box';

const defaultTypeScaleMapping = {
  heading1: {
    fontSize: 'sm',
    lineHeight: 'sm',
    fontWeight: 'semibold',
  },
  heading2: {
    fontSize: 'md',
    lineHeight: 'md',
    fontWeight: 'semibold',
  },
  heading3: {
    fontSize: 'lg',
    lineHeight: 'lg',
    fontWeight: 'semibold',
  },
  heading4: {
    fontSize: 'xl',
    lineHeight: 'xl',
    fontWeight: 'normal',
  },
  heading5: {
    fontSize: 'xl',
    lineHeight: 'xl',
    fontWeight: 'semibold',
  },
  heading6: {
    fontSize: '2xl',
    lineHeight: '2xl',
    fontWeight: 'normal',
  },
  heading7: {
    fontSize: '3xl',
    lineHeight: '3xl',
    fontWeight: 'normal',
  },
  heading8: {
    fontSize: '4xl',
    lineHeight: '4xl',
    fontWeight: 'normal',
  },
};

const Heading = forwardRef((
  {
    typeScale,
    ...rest
  },
  ref
) => {
  const typeScaleProps = defaultTypeScaleMapping[typeScale];

  return (
    <Box
      ref={ref}
      display="block"
      fontFamily="heading"
      {...typeScaleProps}
      {...rest}
    />
  );
});

Heading.displayName = 'Heading';

export default Heading;
