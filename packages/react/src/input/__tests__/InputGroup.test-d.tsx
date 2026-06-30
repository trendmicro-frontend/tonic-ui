import React, { createRef } from 'react';
import { Input, InputGroup } from '@tonic-ui/react';

// === InputGroup ===
<InputGroup>
  <Input />
</InputGroup>;

// With size
<InputGroup size="sm">
  <Input />
</InputGroup>;
<InputGroup size="md">
  <Input />
</InputGroup>;
<InputGroup size="lg">
  <Input />
</InputGroup>;

// With variant
<InputGroup variant="outline">
  <Input />
</InputGroup>;
<InputGroup variant="filled">
  <Input />
</InputGroup>;
<InputGroup variant="flush">
  <Input />
</InputGroup>;
<InputGroup variant="unstyled">
  <Input />
</InputGroup>;

// With render prop (children as function)
<InputGroup>
  {(context) => (
    <Input placeholder={`Size: ${context.size}`} />
  )}
</InputGroup>;

// StyleProps
<InputGroup padding="2x">
  <Input />
</InputGroup>;

// Ref
const groupRef = createRef<HTMLDivElement>();
<InputGroup ref={groupRef}>
  <Input />
</InputGroup>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to InputGroup
<InputGroup ref={wrongRef}>
  <Input />
</InputGroup>;

// === Negative tests ===
// @ts-expect-error - 'solid' is not a valid variant for InputGroup
<InputGroup variant="solid">
  <Input />
</InputGroup>;

// @ts-expect-error - 'xl' is not a valid size for InputGroup
<InputGroup size="xl">
  <Input />
</InputGroup>;
