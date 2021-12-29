import { ensureBoolean } from 'ensure-type';
import React, { forwardRef } from 'react';
import ButtonBase from '../ButtonBase';
import wrapEvent from '../utils/wrapEvent';
import useAccordionItem from './useAccordionItem';
import { useAccordionToggleStyle } from './styles';

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
  const styleProps = useAccordionToggleStyle({ disabled });

  return (
    <ButtonBase
      ref={ref}
      disabled={disabled}
      onClick={wrapEvent(onClickProp, context?.onToggle)}
      {...styleProps}
      {...rest}
    />
  );
});

export default AccordionToggle;
