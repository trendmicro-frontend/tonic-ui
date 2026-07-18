import React, { createRef } from 'react';
import { AccordionItem, AccordionHeader, AccordionBody } from '@tonic-ui/react';

// Basic usage
<AccordionItem>
  <AccordionHeader>Header</AccordionHeader>
  <AccordionBody>Body</AccordionBody>
</AccordionItem>;

// With isExpanded prop
<AccordionItem isExpanded>
  <AccordionHeader>Header</AccordionHeader>
  <AccordionBody>Body</AccordionBody>
</AccordionItem>;

// With defaultIsExpanded prop
<AccordionItem defaultIsExpanded>
  <AccordionHeader>Header</AccordionHeader>
  <AccordionBody>Body</AccordionBody>
</AccordionItem>;

// With disabled prop
<AccordionItem disabled>
  <AccordionHeader>Header</AccordionHeader>
  <AccordionBody>Body</AccordionBody>
</AccordionItem>;

// With render prop (no manual type annotation)
<AccordionItem>
  {({ isExpanded, onToggle, disabled }) => (
    <>
      <AccordionHeader>Dynamic Header</AccordionHeader>
      <AccordionBody>Dynamic Body</AccordionBody>
    </>
  )}
</AccordionItem>;

// With onToggle callback (no manual type annotation)
<AccordionItem onToggle={(state) => console.log(state.isExpanded)}>
  <AccordionHeader>Header</AccordionHeader>
  <AccordionBody>Body</AccordionBody>
</AccordionItem>;

// Ref
const itemRef = createRef<HTMLDivElement>();
<AccordionItem ref={itemRef}>Content</AccordionItem>;

// Wrong ref type
const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement is not assignable to HTMLDivElement
<AccordionItem ref={wrongRef}>Content</AccordionItem>;
