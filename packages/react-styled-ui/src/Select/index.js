import React, { forwardRef } from 'react';
import Box from '../Box';
import Icon from '../Icon';
import PseudoBox from '../PseudoBox';
import { getIconWrapperProps, useSelectStyle } from './styles';
import splitProps from './split-props';

const defaultVariant = 'outline';

const Select = forwardRef((
  {
    variant,
    multiple, // multiple options
    size, // multiple options
    children,
    ...rest
  },
  ref,
) => {
  // Use fallback values if values are null or undefined
  variant = variant ?? defaultVariant;

  const iconWrapperProps = getIconWrapperProps();
  const styleProps = useSelectStyle({ variant, multiple });
  const [rootProps, selectProps] = splitProps(rest);
  const { disabled, required } = selectProps;

  return (
    <Box
      position="relative"
      width="100%"
      {...rootProps}
    >
      <PseudoBox
        ref={ref}
        as="select"
        aria-disabled={disabled}
        aria-required={required}
        multiple={multiple}
        size={size}
        {...styleProps}
        {...selectProps}
      >
        {children}
      </PseudoBox>
      {!multiple && (
        <PseudoBox
          aria-disabled={disabled}
          {...iconWrapperProps}
        >
          <Icon width="4x" name="_core.angle-down" />
        </PseudoBox>
      )}
    </Box>
  );
});

Select.displayName = 'Select';

export default Select;
