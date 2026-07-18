import React, { createRef } from 'react';
import { MenuToggleIcon } from '@tonic-ui/react';

// === MenuToggleIcon ===
<MenuToggleIcon />;

// With render prop (children as function)
<MenuToggleIcon>
  {(state, props) => (
    <div ref={props.ref} style={props.style}>
      {state === 'entered' ? '▲' : '▼'}
    </div>
  )}
</MenuToggleIcon>;

// With easing as object
<MenuToggleIcon easing={{ enter: 'ease-in', exit: 'ease-out' }} />;

// With easing as string
<MenuToggleIcon easing="ease-in-out" />;

// With timeout as object
<MenuToggleIcon timeout={{ appear: 300, enter: 300, exit: 200 }} />;

// With timeout as number
<MenuToggleIcon timeout={300} />;

// With appear prop
<MenuToggleIcon appear />;
<MenuToggleIcon appear={false} />;

// Ref
const toggleIconRef = createRef<HTMLDivElement>();
<MenuToggleIcon ref={toggleIconRef} />;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to MenuToggleIcon
<MenuToggleIcon ref={wrongRef} />;
