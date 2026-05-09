import { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { defaultVariant } from './constants';
import { useMarkStyle } from './styles';

const Mark = forwardRef((inProps, ref) => {
  const {
    variant = defaultVariant,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Mark' });

  const styleProps = useMarkStyle({ variant });

  return (
    <Box
      as="mark"
      ref={ref}
      {...styleProps}
      {...rest}
    />
  );
});

Mark.displayName = 'Mark';

export default Mark;
