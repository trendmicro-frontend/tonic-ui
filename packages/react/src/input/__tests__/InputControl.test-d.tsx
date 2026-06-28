import React, { createRef } from 'react';
import { Input, InputAdornment, InputControl } from '@tonic-ui/react';

// === InputControl ===
<InputControl>
  <Input />
</InputControl>;

// With startAdornment and endAdornment
<InputControl
  startAdornment={<InputAdornment>$</InputAdornment>}
  endAdornment={<InputAdornment>.00</InputAdornment>}
>
  <Input />
</InputControl>;

// With disabled
<InputControl disabled>
  <Input />
</InputControl>;

// With error (boolean)
<InputControl error>
  <Input />
</InputControl>;

// With error (string)
<InputControl error="Invalid input">
  <Input />
</InputControl>;

// With size
<InputControl size="sm">
  <Input />
</InputControl>;
<InputControl size="md">
  <Input />
</InputControl>;
<InputControl size="lg">
  <Input />
</InputControl>;

// With variant
<InputControl variant="outline">
  <Input />
</InputControl>;
<InputControl variant="filled">
  <Input />
</InputControl>;
<InputControl variant="flush">
  <Input />
</InputControl>;
<InputControl variant="unstyled">
  <Input />
</InputControl>;

// With inputComponent
<InputControl inputComponent="textarea">
  Content
</InputControl>;

// With inputProps
<InputControl inputProps={{ placeholder: 'Enter text', type: 'email' }}>
  <Input />
</InputControl>;

// With inputRef
const inputRef = createRef<HTMLInputElement>();
<InputControl inputRef={inputRef}>
  <Input />
</InputControl>;

// StyleProps
<InputControl padding="2x">
  <Input />
</InputControl>;

// Ref
const controlRef = createRef<HTMLDivElement>();
<InputControl ref={controlRef}>
  <Input />
</InputControl>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to InputControl
<InputControl ref={wrongRef}>
  <Input />
</InputControl>;

// === Negative tests ===
// @ts-expect-error - 'solid' is not a valid variant for InputControl
<InputControl variant="solid">
  <Input />
</InputControl>;

// @ts-expect-error - 'xl' is not a valid size for InputControl
<InputControl size="xl">
  <Input />
</InputControl>;
