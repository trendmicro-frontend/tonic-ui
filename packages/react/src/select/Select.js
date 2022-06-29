import { useOnceWhen } from '@tonic-ui/react-hooks';
import { warnDeprecatedProps } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { Icon } from '../icon';
import { getIconWrapperProps, useSelectStyle } from './styles';
import splitProps from './split-props';

const defaultVariant = 'outline';

const Select = forwardRef((
  {
    isInvalid, // deprecated

    children,
    error,
    variant,
    ...rest
  },
  ref,
) => {
  { // deprecation warning
    const prefix = `${Select.displayName}:`;

    useOnceWhen(() => {
      warnDeprecatedProps('isInvalid', {
        prefix,
        alternative: 'error',
        willRemove: true,
      });
    }, (isInvalid !== undefined));

    error = error || isInvalid; // TODO: remove this line after deprecation
  }

  // Use fallback values if values are null or undefined
  variant = variant ?? defaultVariant;

  const iconWrapperProps = getIconWrapperProps();

  const ariaProps = {
    'aria-disabled': rest.disabled,
    'aria-invalid': error,
    'aria-required': rest.required,
  };
  const multiple = rest.multiple;
  const styleProps = useSelectStyle({
    variant,
    multiple,
  });
  const [rootProps, selectProps] = splitProps(rest);

  return (
    <Box
      position="relative"
      width="100%"
      {...rootProps}
    >
      <Box
        as="select"
        ref={ref}
        {...ariaProps}
        {...styleProps}
        {...selectProps}
      >
        {children}
      </Box>
      {!multiple && (
        <Box
          aria-disabled={rest.disabled}
          disabled={rest.disabled}
          {...iconWrapperProps}
        >
          <Icon width="4x" icon="angle-down" />
        </Box>
      )}
    </Box>
  );
});

Select.displayName = 'Select';

export default Select;
