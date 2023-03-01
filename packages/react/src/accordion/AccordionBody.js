import React, { forwardRef } from 'react';
import AccordionContent from './AccordionContent';
import { useAccordionBodyStyle } from './styles';

const AccordionBody = forwardRef((props, ref) => {
  const styleProps = useAccordionBodyStyle();

  return (
    <AccordionContent
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

AccordionBody.displayName = 'AccordionBody';

export default AccordionBody;
