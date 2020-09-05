import React, { forwardRef } from 'react';
import PseudoBox from '../PseudoBox';
import { useOptionGroupStyle } from './styles';

const OptionGroup = forwardRef((props, ref) => {
  const styleProps = useOptionGroupStyle();

  return (
    <PseudoBox
      as="optgroup"
      {...styleProps}
      {...props}
    />
  );
});

OptionGroup.displayName = 'OptionGroup';

export default OptionGroup;
