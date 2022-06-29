import { callEventHandlers } from '@tonic-ui/utils';
import { ensureBoolean } from 'ensure-type';
import React, { forwardRef } from 'react';
import { ButtonBase } from '../button';
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
      onClick={callEventHandlers(onClickProp, context?.onToggle)}
      {...styleProps}
      {...rest}
    />
  );
});

export default AccordionToggle;
