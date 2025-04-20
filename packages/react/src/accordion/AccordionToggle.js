import { ariaAttr, callEventHandlers } from '@tonic-ui/utils';
import { useEventCallback } from '@tonic-ui/react-hooks';
import { ensureBoolean, ensureFunction } from 'ensure-type';
import React, { forwardRef } from 'react';
import { ButtonBase } from '../button';
import { useDefaultProps } from '../default-props';
import useAccordionItem from './useAccordionItem';
import { useAccordionToggleStyle } from './styles';

const AccordionToggle = forwardRef((inProps, ref) => {
  const {
    children,
    disabled: disabledProp,
    onClick: onClickProp,
    onKeyDown: onKeyDownProp,
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

  const onClick = useEventCallback((event) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    ensureFunction(toggleAccordionItem)();
  }, [disabled, toggleAccordionItem]);

  const onKeyDown = useEventCallback((event) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); // Prevent default scrolling for Space

      ensureFunction(toggleAccordionItem)();
    }
  }, [disabled, toggleAccordionItem]);

  const getAccordionToggleProps = () => ({
    'aria-controls': accordionContentId,
    'aria-disabled': ariaAttr(disabled),
    'aria-expanded': ariaAttr(isExpanded),
    disabled,
    id: accordionToggleId,
    onClick: callEventHandlers(onClickProp, onClick),
    onKeyDown: callEventHandlers(onKeyDownProp, onKeyDown),
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
