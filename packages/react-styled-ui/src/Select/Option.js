import React, { forwardRef } from 'react';
import PseudoBox from '../PseudoBox';
import { useOptionStyle } from './styles';

const Option = forwardRef((props, ref) => {
  const styleProps = useOptionStyle();

  return (
    <PseudoBox
      as="option"
      {...styleProps}
      {...props}
    />
  );
});

Option.displayName = 'Option';

export default Option;
