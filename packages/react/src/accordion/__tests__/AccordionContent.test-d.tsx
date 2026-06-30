import React, { createRef } from 'react';
import { AccordionContent } from '@tonic-ui/react';

// Basic usage
<AccordionContent>Content</AccordionContent>;

// With TransitionComponent
<AccordionContent TransitionComponent={(props: React.ComponentPropsWithRef<'div'>) => <div {...props} />}>
  Content with custom transition
</AccordionContent>;

// With TransitionProps
<AccordionContent TransitionProps={{ timeout: 300 }}>
  Content with transition props
</AccordionContent>;

<AccordionContent TransitionProps={{ timeout: { enter: 300, exit: 200 }, appear: true }}>
  Content with detailed transition props
</AccordionContent>;

// Ref
const contentRef = createRef<HTMLElement>();
<AccordionContent ref={contentRef}>Content</AccordionContent>;
