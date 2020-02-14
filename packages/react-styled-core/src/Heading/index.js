import React, { forwardRef } from 'react';
import Box from '../Box';

const defaultVariantMapping = {
  h1: {
    as: 'h1',
    fontSize: '4xl',
    lineHeight: '4xl',
    fontWeight: 'semibold',
    m: 0,
  },
  h2: {
    as: 'h2',
    fontSize: '2xl',
    lineHeight: '2xl',
    fontWeight: 'semibold',
    margin: 0,
  },
  h3: {
    as: 'h3',
    fontSize: 'xl',
    lineHeight: 'xl',
    fontWeight: 'semibold',
    margin: 0,
  },
  h4: {
    as: 'h4',
    fontSize: 'md',
    lineHeight: 'md',
    fontWeight: 'semibold',
    margin: 0,
  },
  h5: {
    as: 'h5',
    fontSize: 'sm',
    lineHeight: 'sm',
    fontWeight: 'semibold',
    margin: 0,
  },
  h6: {
    as: 'h6',
    fontSize: 'sm',
    lineHeight: 'sm',
    fontWeight: 'normal',
    margin: 0,
  },
};

const Heading = forwardRef((
  {
    variant,
    ...rest
  },
  ref
) => {
  const variantProps = defaultVariantMapping[variant];

  return (
    <Box
      ref={ref}
      as={defaultVariantMapping[variant]}
      display="block"
      fontFamily="heading"
      {...variantProps}
      {...rest}
    />
  );
});

Heading.displayName = 'Heading';

export default Heading;
