import { ariaAttr } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import AccordionCollapse from './AccordionCollapse';
import useAccordionItem from './useAccordionItem';

const AccordionBody = forwardRef((props, ref) => {
  const context = useAccordionItem(); // context might be an undefined value
  const id = context?.bodyId;

  return (
    <AccordionCollapse
      aria-hidden={ariaAttr(!context?.isExpanded)}
      aria-labelledby={context?.headerId}
      id={id}
      ref={ref}
      {...props}
    />
  );
});

export default AccordionBody;
