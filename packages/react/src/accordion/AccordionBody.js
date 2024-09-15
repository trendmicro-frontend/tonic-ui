import React, { forwardRef } from 'react';
import { useDefaultProps } from '../default-props';
import AccordionContent from './AccordionContent';
import { useAccordionBodyStyle } from './styles';

const AccordionBody = forwardRef((inProps, ref) => {
  const props = useDefaultProps({ props: inProps, name: 'AccordionBody' });
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
