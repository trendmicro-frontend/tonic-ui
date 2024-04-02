import { useOnce } from '@tonic-ui/react-hooks';
import React, { forwardRef } from 'react';
import { AccordionContent } from '../accordion';

const AccordionCollapse = forwardRef((props, ref) => {
  useOnce(() => {
    console.error('Warning: The `AccordionCollapse` component is deprecated and will be removed in the next major release. Use the `AccordionContent` component instead.');
  });

  return (
    <AccordionContent ref={ref} {...props} />
  );
});

AccordionCollapse.displayName = 'AccordionCollapse';

export default AccordionCollapse;
