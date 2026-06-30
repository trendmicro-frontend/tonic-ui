import React, { createRef } from 'react';
import { Scale } from '@tonic-ui/react';

// Basic usage
<Scale in><div>Scaled content</div></Scale>;

// With in prop
<Scale in={true}>Visible</Scale>;
<Scale in={false}>Hidden</Scale>;

// With unmountOnExit
<Scale in unmountOnExit>Content</Scale>;

// With mountOnEnter
<Scale in mountOnEnter>Content</Scale>;

// With timeout as number
<Scale in timeout={300}>Animated</Scale>;

// With timeout as object
<Scale in timeout={{ appear: 300, enter: 300, exit: 200 }}>Complete timeout object</Scale>;

// With easing as string
<Scale in easing="ease-in-out"><div>String easing</div></Scale>;

// With easing as object
<Scale in easing={{ enter: 'ease-in', exit: 'ease-out' }}><div>Custom easing</div></Scale>;

// With appear prop
<Scale in appear><div>Appears on mount</div></Scale>;

// With initialScale
<Scale in initialScale={[0.5, 0.5]}><div>Custom initial scale</div></Scale>;

// With render prop (no manual type annotation)
<Scale in>
  {(state, props) => (
    <div ref={props.ref} style={props.style}>
      Scaling: {state}
    </div>
  )}
</Scale>;

// Ref
const scaleRef = createRef<HTMLDivElement>();
<Scale ref={scaleRef} in>Content</Scale>;

// Wrong ref type
const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement is not assignable to HTMLDivElement
<Scale ref={wrongRef} in>Content</Scale>;
