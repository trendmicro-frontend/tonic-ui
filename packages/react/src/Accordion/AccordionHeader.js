import React, { forwardRef } from 'react';
import AccordionToggle from './AccordionToggle';
import useAccordionItem from './useAccordionItem';

const AccordionHeader = forwardRef((props, ref) => {
  const context = useAccordionItem(); // context might be an undefined value
  const ariaControls = context?.bodyId;
  const id = context?.headerId;

  return (
    <AccordionToggle
      aria-controls={ariaControls}
      id={id}
      ref={ref}
      {...props}
    />
  );
});

export default AccordionHeader;
