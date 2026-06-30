import React, { createRef } from 'react';
import { AccordionToggle } from '@tonic-ui/react';

// Basic usage
<AccordionToggle>Toggle</AccordionToggle>;

// With disabled
<AccordionToggle disabled>Disabled Toggle</AccordionToggle>;
<AccordionToggle disabled={false}>Enabled Toggle</AccordionToggle>;

// With onClick
<AccordionToggle onClick={(e) => console.log(e)}>Clickable Toggle</AccordionToggle>;

// With render prop (no manual type annotation)
<AccordionToggle>
  {({ getAccordionToggleProps }) => (
    <button type="button" {...getAccordionToggleProps()}>Custom Toggle</button>
  )}
</AccordionToggle>;

// Ref
const toggleRef = createRef<HTMLButtonElement>();
<AccordionToggle ref={toggleRef}>Toggle</AccordionToggle>;

// Wrong ref type
const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement is not assignable to HTMLButtonElement
<AccordionToggle ref={wrongRef}>Toggle</AccordionToggle>;
