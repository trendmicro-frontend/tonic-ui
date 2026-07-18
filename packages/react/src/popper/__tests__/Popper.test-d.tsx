import React, { createRef } from 'react';
import { Popper } from '@tonic-ui/react';

// === Popper ===
<Popper>Popper content</Popper>;

// With placement
<Popper placement="top">Top</Popper>;
<Popper placement="bottom">Bottom</Popper>;
<Popper placement="left">Left</Popper>;
<Popper placement="right">Right</Popper>;
<Popper placement="top-start">Top Start</Popper>;
<Popper placement="top-end">Top End</Popper>;
<Popper placement="bottom-start">Bottom Start</Popper>;
<Popper placement="bottom-end">Bottom End</Popper>;
<Popper placement="left-start">Left Start</Popper>;
<Popper placement="left-end">Left End</Popper>;
<Popper placement="right-start">Right Start</Popper>;
<Popper placement="right-end">Right End</Popper>;

// With isOpen
<Popper isOpen>Open Popper</Popper>;

// With usePortal
<Popper usePortal>Portaled</Popper>;

// With unmountOnExit
<Popper unmountOnExit>Unmount on Exit</Popper>;

// With matchWidth
<Popper matchWidth>Match width</Popper>;
<Popper matchWidth={false}>No match</Popper>;

// With render prop children
<Popper>
  {(context) => (
    <div>Placement: {context.placement}</div>
  )}
</Popper>;

// Ref
const popperRef = createRef<HTMLDivElement>();
<Popper ref={popperRef}>Content</Popper>;

// With anchorEl
const divElement = document.createElement('div');
<Popper anchorEl={divElement}>Content</Popper>;

const anchorFromDOM = document.getElementById('anchor');
<Popper anchorEl={anchorFromDOM}>Content</Popper>;

<Popper anchorEl={null}>Content</Popper>;

<Popper anchorEl={() => document.createElement('div')}>Content</Popper>;

const anchorRef = createRef<HTMLElement>();
<Popper anchorEl={anchorRef.current}>Content</Popper>;

// With referenceRef
const refObject = createRef<HTMLElement>();
<Popper referenceRef={refObject}>Content</Popper>;

// === Negative tests ===
// @ts-expect-error - string is not assignable to anchorEl
<Popper anchorEl="invalid">Content</Popper>;

// @ts-expect-error - number is not assignable to anchorEl
<Popper anchorEl={42}>Content</Popper>;
