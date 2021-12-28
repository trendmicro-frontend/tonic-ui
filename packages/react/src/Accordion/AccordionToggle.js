import { ensureBoolean } from 'ensure-type';
import React, { forwardRef } from 'react';
import ButtonBase from '../ButtonBase';
import wrapEvent from '../utils/wrapEvent';
import useAccordionItem from './useAccordionItem';

const AccordionToggle = forwardRef((
  {
    disabled: disabledProp,
    onClick: onClickProp,
    ...rest
  },
  ref,
) => {
  const context = useAccordionItem(); // context might be an undefined value
  const disabled = ensureBoolean(disabledProp ?? context?.disabled);

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
