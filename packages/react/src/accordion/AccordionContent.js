import { useOnceWhen } from '@tonic-ui/react-hooks';
import { ariaAttr, warnDeprecatedProps } from '@tonic-ui/utils';
import { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { Collapse } from '../transitions';
import useSlot from '../slot';
import useAccordionItem from './useAccordionItem';

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
    ownerDisplayName: AccordionContent.displayName,
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
