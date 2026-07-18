import React, { createRef } from 'react';
import { Zoom } from '@tonic-ui/react';

// Basic usage
<Zoom in><div>Zoomed content</div></Zoom>;

// With in prop
<Zoom in={true}>Visible</Zoom>;
<Zoom in={false}>Hidden</Zoom>;

// With unmountOnExit
<Zoom in unmountOnExit>Content</Zoom>;

// With mountOnEnter
<Zoom in mountOnEnter>Content</Zoom>;

// With timeout as number
<Zoom in timeout={300}>Animated</Zoom>;

// With timeout as object
<Zoom in timeout={{ appear: 300, enter: 300, exit: 200 }}>Complete timeout object</Zoom>;

// With easing as string
<Zoom in easing="ease-in-out"><div>String easing</div></Zoom>;

// With easing as object
<Zoom in easing={{ enter: 'ease-in', exit: 'ease-out' }}><div>Custom easing</div></Zoom>;

// With appear prop
<Zoom in appear><div>Appears on mount</div></Zoom>;

// With render prop (no manual type annotation)
<Zoom in>
  {(state, props) => (
    <div ref={props.ref} style={props.style}>
      Zooming: {state}
    </div>
  )}
</Zoom>;

// Ref
const zoomRef = createRef<HTMLDivElement>();
<Zoom ref={zoomRef} in>Content</Zoom>;

// Wrong ref type
const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement is not assignable to HTMLDivElement
<Zoom ref={wrongRef} in>Content</Zoom>;
