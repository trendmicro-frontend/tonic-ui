import React, { createRef } from 'react';
import { AccordionCollapse } from '@tonic-ui/react';

// Basic usage (deprecated, use AccordionContent)
<AccordionCollapse>Content</AccordionCollapse>;

// Ref
const collapseRef = createRef<HTMLDivElement>();
<AccordionCollapse ref={collapseRef}>Content</AccordionCollapse>;
