import React, { createRef } from 'react';
import { MenuToggle } from '@tonic-ui/react';

// === MenuToggle ===
<MenuToggle>Toggle</MenuToggle>;

// With render prop
<MenuToggle>
  {({ getMenuToggleProps }) => (
    <button type="button" {...getMenuToggleProps()}>Custom Toggle</button>
  )}
</MenuToggle>;

// Ref
const toggleRef = createRef<HTMLButtonElement>();
<MenuToggle ref={toggleRef}>Toggle</MenuToggle>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to MenuToggle
<MenuToggle ref={wrongRef}>Toggle</MenuToggle>;
