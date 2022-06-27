import {
  runIfFn,
} from '@tonic-ui/utils';
import memoize from 'micro-memoize';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { ButtonGroupContext } from './context';
import { useButtonGroupStyle } from './styles';

const getMemoizedState = memoize(state => ({ ...state }));

const defaultOrientation = 'horizontal';
const defaultSize = 'md';
const defaultVariant = 'default';

const ButtonGroup = forwardRef((
  {
    children,
    orientation = defaultOrientation,
    size = defaultSize,
    variant = defaultVariant,
    ...rest
  },
  ref
) => {
  const styleProps = useButtonGroupStyle({ orientation });
  const context = getMemoizedState({ orientation, size, variant });

  return (
    <ButtonGroupContext.Provider value={context}>
      <Box
        ref={ref}
        {...styleProps}
        {...rest}
      >
        {runIfFn(children, context)}
      </Box>
    </ButtonGroupContext.Provider>
  );
});

ButtonGroup.displayName = 'ButtonGroup';

export default ButtonGroup;
