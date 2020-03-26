import React, { forwardRef } from 'react';
import InputBase from '../InputBase';
import { useInputGroup } from '../InputGroup/context';
import PseudoBox from '../PseudoBox';
import useInputStyle from './useInputStyle';

const defaultSize = 'md';
const defaultVariant = 'outline';

const Input = forwardRef((
  {
    size,
    variant,
    css,
    ...rest
  },
  ref,
) => {
  const inputGroupContext = useInputGroup();
  if (inputGroupContext) {
    const {
      size: inputGroupSize,
      variant: inputGroupVariant,
    } = { ...inputGroupContext };

    // - Use the inherited value from the input group
    // - Fallback to the default value if the value is null or undefined
    size = (size ?? inputGroupSize) ?? defaultSize;
    variant = (variant ?? inputGroupVariant) ?? defaultVariant;

    const useNegativeMargin = (variant === 'outline' || variant === 'filled');

    css = {
      '&:not(:first-child)': {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      },
      '&:not(:last-child)': {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      },
      // adjacent sibling
      '&+&': {
        marginLeft: useNegativeMargin ? -1 : 0,
      },
      ...css
    };
  } else {
    // Use the default value if the value is null or undefined
    size = size ?? defaultSize;
    variant = variant ?? defaultVariant;
  }

  const styleProps = useInputStyle({ size, variant });

  return (
    <InputBase
      ref={ref}
      as="input"
      css={css}
      {...styleProps}
      {...rest}
    />
  );
});

Input.displayName = 'Input';

export default Input;
