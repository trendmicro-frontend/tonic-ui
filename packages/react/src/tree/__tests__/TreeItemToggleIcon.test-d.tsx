import React, { createRef } from 'react';
import { TreeItemToggleIcon } from '@tonic-ui/react';

// Basic usage
<TreeItemToggleIcon />;

// With render prop (no manual type annotation)
<TreeItemToggleIcon>
  {(state, props) => (
    <div ref={props.ref} style={props.style}>
      {state === 'entered' ? 'Expanded' : 'Collapsed'}
    </div>
  )}
</TreeItemToggleIcon>;

// With easing as string
<TreeItemToggleIcon easing="ease-in-out" />;

// With easing as object
<TreeItemToggleIcon easing={{ enter: 'ease-in', exit: 'ease-out' }} />;

// With timeout as number
<TreeItemToggleIcon timeout={300} />;

// With timeout as object
<TreeItemToggleIcon timeout={{ enter: 133, exit: 93 }} />;

// With appear
<TreeItemToggleIcon appear />;

// With disabled
<TreeItemToggleIcon disabled />;

// Ref
const toggleIconRef = createRef<HTMLDivElement>();
<TreeItemToggleIcon ref={toggleIconRef} />;

// Wrong ref type
const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement is not assignable to HTMLDivElement
<TreeItemToggleIcon ref={wrongRef} />;
