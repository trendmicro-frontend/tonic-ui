import React, { createRef } from 'react';
import { InputGroupAddon, InputGroupAppend } from '@tonic-ui/react';

// === InputGroupAppend ===
<InputGroupAppend>
  <InputGroupAddon>.com</InputGroupAddon>
</InputGroupAppend>;

// StyleProps
<InputGroupAppend padding="1x">Styled</InputGroupAppend>;

// Ref
const appendRef = createRef<HTMLDivElement>();
<InputGroupAppend ref={appendRef}>Append</InputGroupAppend>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to InputGroupAppend
<InputGroupAppend ref={wrongRef}>Append</InputGroupAppend>;
