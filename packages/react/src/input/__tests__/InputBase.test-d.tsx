import React, { createRef } from 'react';
import { InputBase } from '@tonic-ui/react';

// === InputBase ===
<InputBase />;

// With disabled
<InputBase disabled />;

// With readOnly
<InputBase readOnly />;

// With error
<InputBase error />;

// With native input props
<InputBase type="text" placeholder="Enter text" />;
<InputBase value="test" onChange={(e) => console.log(e.target.value)} />;

// StyleProps
<InputBase padding="2x" />;

// Ref
const inputBaseRef = createRef<HTMLInputElement>();
<InputBase ref={inputBaseRef} />;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to InputBase
<InputBase ref={wrongRef} />;
