import { ariaAttr, callEventHandlers } from '@tonic-ui/utils';
import { ensureBoolean, ensureFunction } from 'ensure-type';
import React, { forwardRef } from 'react';
import { ButtonBase } from '../button';
import { useDefaultProps } from '../default-props';
import useButtonEventHandlers from '../utils/useButtonEventHandlers';
import useAccordionItem from './useAccordionItem';
import { useAccordionToggleStyle } from './styles';

/**
 * @typedef {Object} AccordionToggleProps
 * @property {React.ReactNode | ((context: { getAccordionToggleProps: () => React.HTMLAttributes<HTMLElement> & { ref: React.RefCallback<HTMLElement> } }) => React.ReactNode)} [children] - A function child can be used instead of a React element. This function is called with the context object containing `getAccordionToggleProps`.
 */

/**
 * @type {ForwardRefComponent<'button', AccordionToggleProps>}
 */
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

  const { onClick, onKeyDown } = useButtonEventHandlers({
    disabled,
    onActivate: () => ensureFunction(toggleAccordionItem)(),
  });

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
