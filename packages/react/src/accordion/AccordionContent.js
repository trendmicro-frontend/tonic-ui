import { useOnceWhen } from '@tonic-ui/react-hooks';
import { ariaAttr, warnDeprecatedProps } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { Collapse } from '../transitions';
import { useSlot } from '../slot';
import useAccordionItem from './useAccordionItem';

/**
 * @typedef {Object} AccordionContentProps
 * @property {React.ReactNode} [children] - The content of the accordion.
 * @property {{ transition?: object }} [slotProps] - Props forwarded to the internal transition slot.
 * @property {{ transition?: React.ElementType }} [slots] - Slot components. `slots.transition` replaces the default `Collapse`.
 * @property {React.ElementType} [TransitionComponent=Collapse] - **Deprecated.** Use `slots.transition` instead. The component used for the transition.
 * @property {{ appear?: boolean; timeout?: number | { appear?: number; enter?: number; exit?: number } }} [TransitionProps] - **Deprecated.** Use `slotProps.transition` instead. Props applied to the transition element.
 */

/**
 * @type {ForwardRefComponent<'div', AccordionContentProps>}
 */
const AccordionContent = forwardRef((inProps, ref) => {
  const {
    TransitionComponent, // deprecated
    TransitionProps, // deprecated
    slots = {},
    slotProps = {},
    ...rest
  } = useDefaultProps({ props: inProps, name: 'AccordionContent' });

  { // deprecation warning
    const prefix = `${AccordionContent.displayName}:`;
    useOnceWhen(() => {
      warnDeprecatedProps('TransitionComponent', {
        prefix,
        alternative: 'slots.transition',
        willRemove: true,
      });
    }, TransitionComponent !== undefined);
    useOnceWhen(() => {
      warnDeprecatedProps('TransitionProps', {
        prefix,
        alternative: 'slotProps.transition',
        willRemove: true,
      });
    }, TransitionProps !== undefined);
  }

  const context = useAccordionItem(); // context might be an undefined value

  const [TransitionSlot, transitionSlotProps] = useSlot({
    name: 'transition',
    ownerName: AccordionContent.displayName,
    props: {
      ref,
      appear: false,
      'aria-hidden': ariaAttr(!context?.isExpanded),
      'aria-labelledby': context?.accordionToggleId,
      id: context?.accordionContentId,
      role: 'region',
    },
    slot: slots.transition ?? TransitionComponent ?? Collapse,
    slotProps: { ...TransitionProps, ...slotProps.transition },
  });

  if (!context) {
    return (
      <Box ref={ref} {...rest} />
    );
  }

  return (
    <TransitionSlot
      {...transitionSlotProps}
      {...rest}
      in={context.isExpanded}
    />
  );
});

AccordionContent.displayName = 'AccordionContent';

export default AccordionContent;
