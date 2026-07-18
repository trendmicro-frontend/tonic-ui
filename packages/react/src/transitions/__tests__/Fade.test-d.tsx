import React, { createRef } from 'react';
import { Fade } from '@tonic-ui/react';

// Basic usage
<Fade in><div>Faded content</div></Fade>;

// With in prop
<Fade in={true}>Visible</Fade>;
<Fade in={false}>Hidden</Fade>;

// With unmountOnExit
<Fade in unmountOnExit>Content</Fade>;

// With mountOnEnter
<Fade in mountOnEnter>Content</Fade>;

// With timeout as number
<Fade in timeout={300}>Animated</Fade>;

// With timeout as object
<Fade in timeout={{ appear: 300, enter: 300, exit: 200 }}>Complete timeout object</Fade>;

// With easing as string
<Fade in easing="ease-in-out"><div>String easing</div></Fade>;

// With easing as object
<Fade in easing={{ enter: 'ease-in', exit: 'ease-out' }}><div>Custom easing</div></Fade>;

// With appear prop
<Fade in appear><div>Appears on mount</div></Fade>;

// With render prop (no manual type annotation)
<Fade in>
  {(state, props) => (
    <div ref={props.ref} style={props.style}>
      Fading: {state}
    </div>
  )}
</Fade>;

// Ref
const fadeRef = createRef<HTMLDivElement>();
<Fade ref={fadeRef} in>Content</Fade>;

// Wrong ref type
const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement is not assignable to HTMLDivElement
<Fade ref={wrongRef} in>Content</Fade>;
