import React, { forwardRef } from 'react';
import ButtonBase from '../ButtonBase';
import wrapEvent from '../utils/wrapEvent';
import useAccordionItem from './useAccordionItem';

const AccordionToggle = forwardRef((
  {
    disabled,
    onClick: onClickProp,
    ...rest
  },
  ref,
) => {
  const context = useAccordionItem(); // context might be an undefined value

  return (
    <ButtonBase
      ref={ref}
      cursor={disabled ? 'default' : 'pointer'}
      disabled={disabled}
      onClick={wrapEvent(onClickProp, context?.onToggle)}
      {...rest}
    />
  );
});

export default AccordionToggle;
