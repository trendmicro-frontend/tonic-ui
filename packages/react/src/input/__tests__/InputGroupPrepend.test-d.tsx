import React, { createRef } from 'react';
import { InputGroupAddon, InputGroupPrepend } from '@tonic-ui/react';

// === InputGroupPrepend ===
<InputGroupPrepend>
  <InputGroupAddon>https://</InputGroupAddon>
</InputGroupPrepend>;

// StyleProps
<InputGroupPrepend padding="1x">Styled</InputGroupPrepend>;

// Ref
const prependRef = createRef<HTMLDivElement>();
<InputGroupPrepend ref={prependRef}>Prepend</InputGroupPrepend>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to InputGroupPrepend
<InputGroupPrepend ref={wrongRef}>Prepend</InputGroupPrepend>;
