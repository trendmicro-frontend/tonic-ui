import React, { forwardRef } from 'react';
import Icon from '../Icon';
import { useAccordionItem } from './context';

const AccordionIcon = forwardRef((props, ref) => {
  const { isExpanded, isDisabled } = useAccordionItem();

  return (
    <Icon
      ref={ref}
      icon="chevron-down"
      opacity={isDisabled ? 0.4 : 1}
      transform={isExpanded ? 'rotate(180deg)' : null}
      transition="transform 0.2s"
      transformOrigin="center"
      {...props}
    />
  );
});

AccordionIcon.displayName = 'AccordionIcon';

export default AccordionIcon;
