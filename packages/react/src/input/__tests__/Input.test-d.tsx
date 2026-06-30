import React, { createRef } from 'react';
import { Input } from '@tonic-ui/react';

// === Input ===
<Input />;

// With type
<Input type="text" />;
<Input type="email" />;
<Input type="password" />;
<Input type="number" />;

// With placeholder
<Input placeholder="Enter text" />;

// With value and onChange
<Input value="test" onChange={(e) => console.log(e.target.value)} />;

// With disabled
<Input disabled />;

// With readOnly
<Input readOnly />;

// With error state
<Input error />;

// With size
<Input size="sm" />;
<Input size="md" />;
<Input size="lg" />;

// With variant
<Input variant="outline" />;
<Input variant="filled" />;
<Input variant="flush" />;
<Input variant="unstyled" />;

// StyleProps
<Input padding="2x" />;

// Ref
const inputRef = createRef<HTMLInputElement>();
<Input ref={inputRef} />;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to Input
<Input ref={wrongRef} />;

// === Negative tests ===
// @ts-expect-error - 'solid' is not a valid variant for Input
<Input variant="solid" />;

// @ts-expect-error - 'xl' is not a valid size for Input
<Input size="xl" />;
