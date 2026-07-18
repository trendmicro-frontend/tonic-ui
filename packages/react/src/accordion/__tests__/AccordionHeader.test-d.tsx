import React, { createRef } from 'react';
import { AccordionHeader } from '@tonic-ui/react';

// Basic usage
<AccordionHeader>Header Content</AccordionHeader>;

// With onClick
<AccordionHeader onClick={(e) => console.log(e)}>Click me</AccordionHeader>;

// With disabled
<AccordionHeader disabled>Disabled Header</AccordionHeader>;
<AccordionHeader disabled={false}>Enabled Header</AccordionHeader>;

// Ref
const headerRef = createRef<HTMLButtonElement>();
<AccordionHeader ref={headerRef}>Header</AccordionHeader>;
