import { runIfFn } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import useShallowMemo from '../utils/useShallowMemo';
import { ButtonGroupContext } from './context';
import { useButtonGroupStyle } from './styles';

const defaultOrientation = 'horizontal';
const defaultSize = 'md';
const defaultVariant = 'default';

/**
 * @typedef {Object} ButtonGroupProps
 * @property {React.ReactNode | ((context: { disabled?: boolean; orientation: 'horizontal' | 'vertical'; size: 'sm' | 'md' | 'lg'; variant: 'emphasis' | 'primary' | 'default' | 'secondary' | 'ghost' }) => React.ReactNode)} [children] - A function child can be used intead of a React element. This function is called with the context object.
 * @property {boolean} [disabled] - All buttons will be disabled.
 * @property {'horizontal' | 'vertical'} [orientation='horizontal'] - The orientation of the button group.
 * @property {'sm' | 'md' | 'lg'} [size='md'] - The size of the button group.
 * @property {'emphasis' | 'primary' | 'default' | 'secondary' | 'ghost'} [variant='default'] - The variant of the button group.
 */

/**
 * @type {ForwardRefComponent<'div', ButtonGroupProps>}
 */
const ButtonGroup = forwardRef((inProps, ref) => {
  const {
    children,
    disabled,
    orientation = defaultOrientation,
    size = defaultSize,
    variant = defaultVariant,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'ButtonGroup' });
  const shallowMemo = useShallowMemo();
  const styleProps = useButtonGroupStyle({ orientation });

  const context = shallowMemo({
    disabled,
    orientation,
    size,
    variant,
  });

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
