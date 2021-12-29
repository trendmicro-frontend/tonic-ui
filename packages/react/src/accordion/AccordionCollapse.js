import React, { forwardRef } from 'react';
import { Box } from '../box';
import AccordionCollapseTransition from './AccordionCollapseTransition';
import useAccordionItem from './useAccordionItem';

const AccordionCollapse = forwardRef((
  {
    TransitionComponent = AccordionCollapseTransition,
    TransitionProps,
    ...rest
  },
  ref,
) => {
  const context = useAccordionItem(); // context might be an undefined value

  if (!context) {
    return (
      <Box ref={ref} {...rest} />
    );
  }

  return (
    <TransitionComponent
      {...TransitionProps}
      ref={ref}
      in={context?.isExpanded}
      {...rest}
    />
  );
});

export default AccordionCollapse;
