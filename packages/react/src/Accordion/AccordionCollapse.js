import React, { forwardRef } from 'react';
import Box from '../Box';
import Collapse from '../Transitions/Collapse';
import Fade from '../Transitions/Fade';
import useAccordionItem from './useAccordionItem';

const AccordionCollapse = forwardRef((props, ref) => {
  const context = useAccordionItem(); // context might be an undefined value

  if (!context) {
    return (
      <Box ref={ref} {...props} />
    );
  }

  const { isExpanded } = context;

  return (
    <Fade in={isExpanded}>
      <Collapse
        in={isExpanded}
        ref={ref}
        {...props}
      />
    </Fade>
  );
});

export default AccordionCollapse;
