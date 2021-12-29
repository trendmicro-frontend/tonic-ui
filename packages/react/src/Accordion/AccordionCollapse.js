import React, { forwardRef } from 'react';
import Box from '../Box';
import AccordionTransition from './AccordionTransition';
import useAccordionItem from './useAccordionItem';

const AccordionCollapse = forwardRef((props, ref) => {
  const context = useAccordionItem(); // context might be an undefined value

  if (!context) {
    return (
      <Box ref={ref} {...props} />
    );
  }

  return (
    <AccordionTransition
      in={context?.isExpanded}
      ref={ref}
      {...props}
    />
  );
});

export default AccordionCollapse;
