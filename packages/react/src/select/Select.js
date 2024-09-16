import { useOnceWhen } from '@tonic-ui/react-hooks';
import { AngleDownIcon } from '@tonic-ui/react-icons';
import { ariaAttr, warnDeprecatedProps } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { getIconWrapperProps, useSelectStyle } from './styles';
import splitProps from './split-props';

const defaultVariant = 'outline';

const Select = forwardRef((inProps, ref) => {
  const {
    isInvalid, // deprecated

    children,
    error: errorProp,
    variant = defaultVariant,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Select' });

  let error = errorProp;

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

  const iconWrapperProps = getIconWrapperProps();
  const ariaProps = {
    'aria-disabled': ariaAttr(rest.disabled),
    'aria-invalid': ariaAttr(error),
    'aria-required': ariaAttr(rest.required),
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
          aria-disabled={ariaAttr(rest.disabled)}
          disabled={rest.disabled}
          {...iconWrapperProps}
        >
          <AngleDownIcon size="4x" />
        </Box>
      )}
    </Box>
  );
});

Select.displayName = 'Select';

export default Select;
