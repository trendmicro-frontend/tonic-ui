import React, { createRef } from 'react';
import { FormControl, FormLabel, Input } from '@tonic-ui/react';

// === FormControl ===
<FormControl>
  <Input />
</FormControl>;

// With orientation
<FormControl orientation="horizontal">
  <FormLabel>Label</FormLabel>
  <Input />
</FormControl>;
<FormControl orientation="vertical">
  <FormLabel>Label</FormLabel>
  <Input />
</FormControl>;

// With error
<FormControl error>
  <Input />
</FormControl>;

// With disabled
<FormControl disabled>
  <Input />
</FormControl>;

// With readOnly
<FormControl readOnly>
  <Input />
</FormControl>;

// StyleProps
<FormControl padding="4x" margin="2x">
  <Input />
</FormControl>;

// Ref
const formControlRef = createRef<HTMLDivElement>();
<FormControl ref={formControlRef}>
  <Input />
</FormControl>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to FormControl
<FormControl ref={wrongRef}>
  <Input />
</FormControl>;

// === Negative tests ===
// @ts-expect-error - 'diagonal' is not a valid orientation
<FormControl orientation="diagonal">
  <Input />
</FormControl>;
