import { ariaAttr, callEventHandlers } from '@tonic-ui/utils';
import { ensureBoolean, ensureFunction } from 'ensure-type';
import React, { forwardRef } from 'react';
import { ButtonBase } from '../button';
import { useDefaultProps } from '../default-props';
import useInteractiveActionHandlers from '../utils/useInteractiveActionHandlers';
import useAccordionItem from './useAccordionItem';
import { useAccordionToggleStyle } from './styles';

const AccordionToggle = forwardRef((inProps, ref) => {
  const {
    children,
    disabled: disabledProp,
    onClick: onClickProp,
    onKeyDown: onKeyDownProp,
    onKeyUp: onKeyUpProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'AccordionToggle' });
  const {
    accordionContentId,
    accordionToggleId,
    disabled: accordionItemDisabled,
    isExpanded,
    onToggle: toggleAccordionItem,
  } = useAccordionItem();
  const disabled = ensureBoolean(disabledProp ?? accordionItemDisabled);
  const styleProps = useAccordionToggleStyle();

  const { onClick, onKeyDown, onKeyUp } = useInteractiveActionHandlers({
    disabled,
    onAction: () => ensureFunction(toggleAccordionItem)(),
  });

  const getAccordionToggleProps = () => ({
    'aria-controls': accordionContentId,
    'aria-disabled': ariaAttr(disabled),
    'aria-expanded': ariaAttr(isExpanded),
    disabled,
    id: accordionToggleId,
    onClick: callEventHandlers(onClickProp, onClick),
    onKeyDown: callEventHandlers(onKeyDownProp, onKeyDown),
    onKeyUp: callEventHandlers(onKeyUpProp, onKeyUp),
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
