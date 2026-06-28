import React, { createRef } from 'react';
import { Select, Option, OptionGroup } from '@tonic-ui/react';

// === Select ===
<Select>
  <Option value="1">Option 1</Option>
  <Option value="2">Option 2</Option>
</Select>;

// With value (controlled)
<Select value="1" onChange={(e) => console.log(e.target.value)}>
  <Option value="1">Option 1</Option>
  <Option value="2">Option 2</Option>
</Select>;

// With defaultValue
<Select defaultValue="1">
  <Option value="1">Option 1</Option>
  <Option value="2">Option 2</Option>
</Select>;

// With disabled
<Select disabled>
  <Option value="1">Option 1</Option>
</Select>;

// With error
<Select error>
  <Option value="1">Error</Option>
</Select>;

// With variant
<Select variant="outline">
  <Option value="1">Outline</Option>
</Select>;
<Select variant="filled">
  <Option value="1">Filled</Option>
</Select>;
<Select variant="unstyled">
  <Option value="1">Unstyled</Option>
</Select>;

// StyleProps
<Select padding="2x">
  <Option value="1">Styled</Option>
</Select>;

// Complete usage with OptionGroup
<Select defaultValue="apple">
  <OptionGroup label="Fruits">
    <Option value="apple">Apple</Option>
    <Option value="banana">Banana</Option>
  </OptionGroup>
  <OptionGroup label="Vegetables">
    <Option value="carrot">Carrot</Option>
  </OptionGroup>
</Select>;

// Ref
const selectRef = createRef<HTMLSelectElement>();
<Select ref={selectRef}>
  <Option value="1">Option</Option>
</Select>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to Select
<Select ref={wrongRef}>
  <Option value="1">Option</Option>
</Select>;

// === Negative tests ===
// @ts-expect-error - 'solid' is not a valid variant for Select
<Select variant="solid">
  <Option value="1">Invalid variant</Option>
</Select>;
