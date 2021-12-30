import React, { forwardRef } from 'react';
import AccordionCollapse from './AccordionCollapse';
import useAccordionItem from './useAccordionItem';

const AccordionBody = forwardRef((props, ref) => {
  const context = useAccordionItem(); // context might be an undefined value
  const ariaHidden = context ? (!context.isExpanded) : undefined;
  const ariaLabelledby = context?.headerId;
  const id = context?.bodyId;

  return (
    <AccordionCollapse
      aria-hidden={ariaHidden}
      aria-labelledby={ariaLabelledby}
      id={id}
      ref={ref}
      {...props}
    />
  );
});

export default AccordionBody;
