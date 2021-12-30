import memoize from 'micro-memoize';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { ButtonGroupContext } from './context';

const getMemoizedState = memoize(state => ({ ...state }));

const ButtonGroup = forwardRef((
  {
    children,
    size = 'md',
    variant = 'default',
    orientation = 'horizontal',
    ...rest
  },
  ref
) => {
  const buttonGroupState = getMemoizedState({ size, variant, orientation });
  const orientationProps = {
    vertical: {
      flexDirection: 'column',
    },
    horizontal: {
      flexDirection: 'row',
    },
  }[orientation];
  return (
    <ButtonGroupContext.Provider value={buttonGroupState}>
      <Box
        ref={ref}
        display="inline-flex"
        {...orientationProps}
        {...rest}
      >
        {children}
      </Box>
    </ButtonGroupContext.Provider>
  );
});

ButtonGroup.displayName = 'ButtonGroup';

export default ButtonGroup;
