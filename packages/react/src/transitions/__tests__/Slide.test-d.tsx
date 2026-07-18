import React, { createRef } from 'react';
import { Slide } from '@tonic-ui/react';

// Basic usage
<Slide in direction="up"><div>Sliding content</div></Slide>;

// With direction
<Slide in direction="up">Up</Slide>;
<Slide in direction="down">Down</Slide>;
<Slide in direction="left">Left</Slide>;
<Slide in direction="right">Right</Slide>;

// With in prop
<Slide in={true} direction="up">Visible</Slide>;
<Slide in={false} direction="up">Hidden</Slide>;

// With unmountOnExit
<Slide in direction="up" unmountOnExit>Content</Slide>;

// With mountOnEnter
<Slide in direction="up" mountOnEnter>Content</Slide>;

// With timeout as number
<Slide in direction="up" timeout={300}>Animated</Slide>;

// With timeout as object
<Slide in direction="up" timeout={{ appear: 300, enter: 300, exit: 200 }}>Complete timeout object</Slide>;

// With easing as string
<Slide in direction="up" easing="ease-in-out"><div>String easing</div></Slide>;

// With easing as object
<Slide in direction="up" easing={{ enter: 'ease-in', exit: 'ease-out' }}><div>Custom easing</div></Slide>;

// With appear prop
<Slide in direction="up" appear><div>Appears on mount</div></Slide>;

// With render prop (no manual type annotation)
<Slide in direction="up">
  {(state, props) => (
    <div ref={props.ref} style={props.style}>
      Sliding: {state}
    </div>
  )}
</Slide>;

// Ref
const slideRef = createRef<HTMLDivElement>();
<Slide ref={slideRef} in direction="up">Content</Slide>;

// Wrong ref type
const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement is not assignable to HTMLDivElement
<Slide ref={wrongRef} in direction="up">Content</Slide>;

// Negative tests
// @ts-expect-error - 'diagonal' is not a valid direction for Slide
<Slide in direction="diagonal"><div>Invalid direction</div></Slide>;
