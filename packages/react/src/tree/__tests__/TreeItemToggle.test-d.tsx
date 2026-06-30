import React, { createRef } from 'react';
import { TreeItemToggle } from '@tonic-ui/react';

// Basic usage
<TreeItemToggle />;

// With render prop (no manual type annotation)
<TreeItemToggle>
  {({ getTreeItemToggleProps }) => (
    <button type="button" {...getTreeItemToggleProps()}>Custom Toggle</button>
  )}
</TreeItemToggle>;

// With disabled
<TreeItemToggle disabled />;

// Ref
const toggleRef = createRef<HTMLButtonElement>();
<TreeItemToggle ref={toggleRef} />;

// Wrong ref type
const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement is not assignable to HTMLButtonElement
<TreeItemToggle ref={wrongRef} />;
