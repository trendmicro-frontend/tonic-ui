import React, { createRef } from 'react';
import { Collapse } from '@tonic-ui/react';

// Basic usage
<Collapse in><div>Collapsed content</div></Collapse>;

// With in prop
<Collapse in={true}>Visible</Collapse>;
<Collapse in={false}>Hidden</Collapse>;

// With unmountOnExit
<Collapse in unmountOnExit>Content</Collapse>;

// With mountOnEnter
<Collapse in mountOnEnter>Content</Collapse>;

// With timeout as number
<Collapse in timeout={300}>Animated</Collapse>;

// With timeout as object
<Collapse in timeout={{ appear: 300, enter: 300, exit: 200 }}>Complete timeout object</Collapse>;

// With easing as string
<Collapse in easing="ease-in-out"><div>String easing</div></Collapse>;

// With easing as object
<Collapse in easing={{ enter: 'ease-in', exit: 'ease-out' }}><div>Custom easing</div></Collapse>;

// With appear prop
<Collapse in appear><div>Appears on mount</div></Collapse>;

// With collapsedHeight
<Collapse in collapsedHeight={50}><div>collapsedHeight number</div></Collapse>;
<Collapse in collapsedHeight={0}><div>collapsedHeight 0</div></Collapse>;

// With render prop (no manual type annotation)
<Collapse in>
  {(state, props) => (
    <div ref={props.ref} style={props.style}>
      State: {state}
    </div>
  )}
</Collapse>;

// Ref
const collapseRef = createRef<HTMLDivElement>();
<Collapse ref={collapseRef} in>Content</Collapse>;

// Wrong ref type
const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement is not assignable to HTMLDivElement
<Collapse ref={wrongRef} in>Content</Collapse>;
