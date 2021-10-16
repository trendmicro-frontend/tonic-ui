import React, { forwardRef } from 'react';
import Collapse from '../Transitions/Collapse';
import Fade from '../Transitions/Fade';
import { useAccordionItem } from './context';

const AccordionPanel = forwardRef((props, ref) => {
  const {
    isExpanded,
    panelId,
    headerId,
  } = useAccordionItem();

  return (
    <Fade in={isExpanded}>
      <Collapse
        ref={ref}
        in={isExpanded}
        data-accordion-panel=""
        role="region"
        id={panelId}
        aria-labelledby={headerId}
        aria-hidden={!isExpanded}
        {...props}
      />
    </Fade>
  );
});

AccordionPanel.displayName = 'AccordionPanel';

export default AccordionPanel;
