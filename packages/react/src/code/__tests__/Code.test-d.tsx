import React, { createRef } from 'react';
import { Code } from '@tonic-ui/react';

// === Code ===
<Code>const x = 1;</Code>;

// With children
<Code>
  {`function hello() {
    return 'world';
  }`}
</Code>;

// StyleProps
<Code padding="2x" backgroundColor="gray:80" borderRadius="sm">
  npm install
</Code>;

// Ref
const codeRef = createRef<HTMLElement>();
<Code ref={codeRef}>code</Code>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to Code
<Code ref={wrongRef}>code</Code>;
