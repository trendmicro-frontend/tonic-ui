import React, { createRef } from 'react';
import { Grow } from '@tonic-ui/react';

// Basic usage
<Grow in><div>Growing content</div></Grow>;

// With in prop
<Grow in={true}>Visible</Grow>;
<Grow in={false}>Hidden</Grow>;

// With unmountOnExit
<Grow in unmountOnExit>Content</Grow>;

// With mountOnEnter
<Grow in mountOnEnter>Content</Grow>;

// With timeout as number
<Grow in timeout={300}>Animated</Grow>;

// With timeout as object
<Grow in timeout={{ appear: 300, enter: 300, exit: 200 }}>Complete timeout object</Grow>;

// With timeout auto
<Grow in timeout="auto">timeout auto</Grow>;

// With easing as string
<Grow in easing="ease-in-out"><div>String easing</div></Grow>;

// With easing as object
<Grow in easing={{ enter: 'ease-in', exit: 'ease-out' }}><div>Custom easing</div></Grow>;

// With appear prop
<Grow in appear><div>Appears on mount</div></Grow>;

// With render prop (no manual type annotation)
<Grow in>
  {(state, props) => (
    <div ref={props.ref} style={props.style}>
      Growing: {state}
    </div>
  )}
</Grow>;

// Ref
const growRef = createRef<HTMLDivElement>();
<Grow ref={growRef} in>Content</Grow>;

// Wrong ref type
const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement is not assignable to HTMLDivElement
<Grow ref={wrongRef} in>Content</Grow>;
