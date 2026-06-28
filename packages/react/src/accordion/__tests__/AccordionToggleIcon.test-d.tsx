import React, { createRef } from 'react';
import { AccordionToggleIcon } from '@tonic-ui/react';

// Basic usage
<AccordionToggleIcon />;

// With render prop (no manual type annotation)
<AccordionToggleIcon>
  {(state, props) => (
    <div ref={props.ref} style={props.style}>
      {state === 'entered' ? '▲' : '▼'}
    </div>
  )}
</AccordionToggleIcon>;

// With easing as object
<AccordionToggleIcon easing={{ enter: 'ease-in', exit: 'ease-out' }} />;

// With easing as string
<AccordionToggleIcon easing="ease-in-out" />;

// With timeout as object
<AccordionToggleIcon timeout={{ appear: 300, enter: 300, exit: 200 }} />;

// With timeout as number
<AccordionToggleIcon timeout={300} />;

// With appear prop
<AccordionToggleIcon appear />;

// With in prop
<AccordionToggleIcon in />;
<AccordionToggleIcon in={true} />;
<AccordionToggleIcon in={false} />;

// With mountOnEnter prop
<AccordionToggleIcon mountOnEnter />;

// With unmountOnExit prop
<AccordionToggleIcon unmountOnExit />;

// With disabled prop
<AccordionToggleIcon disabled />;
<AccordionToggleIcon disabled={false} />;

// Ref
const toggleIconRef = createRef<HTMLDivElement>();
<AccordionToggleIcon ref={toggleIconRef} />;

// Wrong ref type
const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement is not assignable to HTMLDivElement
<AccordionToggleIcon ref={wrongRef} />;
