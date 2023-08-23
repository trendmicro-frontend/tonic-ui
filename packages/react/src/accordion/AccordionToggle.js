import { ariaAttr, callEventHandlers } from '@tonic-ui/utils';
import { ensureBoolean } from 'ensure-type';
import React, { forwardRef } from 'react';
import { ButtonBase } from '../button';
import useAccordionItem from './useAccordionItem';
import { useAccordionToggleStyle } from './styles';

const AccordionToggle = forwardRef((
  {
    children,
    disabled: disabledProp,
    onClick: onClickProp,
    ...rest
  },
  ref,
) => {
  const context = useAccordionItem(); // context might be an undefined value
  const disabled = ensureBoolean(disabledProp ?? context?.disabled);
  const styleProps = useAccordionToggleStyle();

  const getAccordionToggleProps = () => ({
    'aria-controls': context?.accordionContentId,
    'aria-disabled': ariaAttr(disabled),
    'aria-expanded': ariaAttr(context?.isExpanded),
    disabled,
    id: context?.accordionToggleId,
    onClick: callEventHandlers(onClickProp, context?.onToggle),
    ref,
    role: 'button',
    tabIndex: 0,
    ...styleProps,
    ...rest,
  });

  if (typeof children === 'function') {
    return children({
      getAccordionToggleProps,
    });
  }

  return (
    <ButtonBase {...getAccordionToggleProps()}>
      {children}
    </ButtonBase>
  );
});

export default AccordionToggle;
