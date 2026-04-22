import { Box, Button } from '@tonic-ui/react';
import { forwardRef } from 'react';
import { ButtonBox } from '@/experiments/button-box';

const capitalize = ([first, ...rest]) => first.toUpperCase() + rest.join('').toLowerCase();

const createVariantButtonBox = (variant) => {
  const InnerComponent = forwardRef(function InnerComponent(innerProps, innerRef) {
    return <Button as={Box} ref={innerRef} variant={variant} {...innerProps} />;
  });
  const VariantButtonBox = forwardRef(function VariantButtonBox(props, ref) {
    const styleProps = {
      display: 'inline-flex',
    };
    return <ButtonBox as={InnerComponent} ref={ref} {...styleProps} {...props} />;
  });
  VariantButtonBox.displayName = capitalize(variant) + 'ButtonBox';
  return VariantButtonBox;
};

export default createVariantButtonBox;
