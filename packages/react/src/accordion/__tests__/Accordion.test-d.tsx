import React, { createRef } from 'react';
import { Accordion, AccordionItem, AccordionHeader, AccordionBody } from '@tonic-ui/react';

// Basic usage
<Accordion>
  <AccordionItem>
    <AccordionHeader>Header</AccordionHeader>
    <AccordionBody>Body</AccordionBody>
  </AccordionItem>
</Accordion>;

// With render prop (no manual type annotation)
<Accordion>
  {(context) => (
    <AccordionItem>
      <AccordionHeader>Header</AccordionHeader>
      <AccordionBody>Body</AccordionBody>
    </AccordionItem>
  )}
</Accordion>;

// StyleProps
<Accordion padding="4x" margin="2x">
  <AccordionItem>Content</AccordionItem>
</Accordion>;

// Ref
const accordionRef = createRef<HTMLDivElement>();
<Accordion ref={accordionRef}>Content</Accordion>;

// Wrong ref type
const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement is not assignable to HTMLDivElement
<Accordion ref={wrongRef}>Content</Accordion>;
