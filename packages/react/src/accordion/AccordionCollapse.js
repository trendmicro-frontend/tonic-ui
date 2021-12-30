import React, { forwardRef } from 'react';
import { Box } from '../box';
import { Collapse } from '../transitions';
import useAccordionItem from './useAccordionItem';

const AccordionCollapse = forwardRef((
  {
    TransitionComponent = Collapse,
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
