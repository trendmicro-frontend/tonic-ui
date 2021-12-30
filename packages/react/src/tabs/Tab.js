import React, {
  forwardRef
} from 'react';
import { ButtonBase } from '../button';
import { useTabStyle } from './styles';

const Tab = forwardRef((props, ref) => {
  const { isSelected, disabled, id, ...rest } = props;
  const tabStyleProps = useTabStyle();
  return (
    <ButtonBase
      ref={ref}
      id={`tab:${id}`}
      role="tab"
      tabIndex={isSelected ? 0 : -1}
      disabled={disabled}
      aria-selected={isSelected}
      aria-disabled={disabled}
      aria-controls={`panel:${id}`}
      {...tabStyleProps}
      {...rest}
    />
  );
});

Tab.displayName = 'Tab';

export default Tab;
