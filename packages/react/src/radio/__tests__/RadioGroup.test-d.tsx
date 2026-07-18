import React, { useState } from 'react';
import { Radio, RadioGroup } from '@tonic-ui/react';

// === RadioGroup ===
<RadioGroup>
  <Radio value="1">Option 1</Radio>
  <Radio value="2">Option 2</Radio>
</RadioGroup>;

// Controlled
<RadioGroup
  value="1"
  onChange={(value) => {
    const _v: string = value;
  }}
>
  <Radio value="1">Option 1</Radio>
  <Radio value="2">Option 2</Radio>
</RadioGroup>;

// Uncontrolled with defaultValue
<RadioGroup defaultValue="1">
  <Radio value="1">Option 1</Radio>
  <Radio value="2">Option 2</Radio>
</RadioGroup>;

// Other props
<RadioGroup name="options" disabled>
  <Radio value="1">Option 1</Radio>
</RadioGroup>;

// Size variants
<RadioGroup size="sm"><Radio value="1">Small</Radio></RadioGroup>;
<RadioGroup size="md"><Radio value="1">Medium</Radio></RadioGroup>;
<RadioGroup size="lg"><Radio value="1">Large</Radio></RadioGroup>;

// Render prop (children as function)
<RadioGroup>
  {(context) => (
    <>
      <Radio value="1">Option 1 (size: {context.size})</Radio>
      <Radio value="2">Option 2</Radio>
    </>
  )}
</RadioGroup>;

// === Generic value type (T) ===

enum Color { Red = 'red', Blue = 'blue' }

// String enum — onChange infers T from value prop
<RadioGroup
  value={Color.Red}
  onChange={(value) => {
    const _v: Color = value;
  }}
>
  <Radio value={Color.Red}>Red</Radio>
  <Radio value={Color.Blue}>Blue</Radio>
</RadioGroup>;

// String enum with useState — pass setter directly
function EnumRadioExample() {
  const [color, setColor] = useState(Color.Red);
  return (
    <RadioGroup value={color} onChange={setColor}>
      <Radio value={Color.Red}>Red</Radio>
      <Radio value={Color.Blue}>Blue</Radio>
    </RadioGroup>
  );
}

// Existing string usage still works (backward compatible)
<RadioGroup
  value="1"
  onChange={(value) => {
    const _v: string = value;
  }}
>
  <Radio value="1">Option 1</Radio>
</RadioGroup>;

// Other combinations
<RadioGroup
  value={null}
  onChange={(value) => {
    const _v: string | null = value;
  }}
>
  <Radio value="foo">Foo</Radio>
  <Radio value="bar">Bar</Radio>
</RadioGroup>;

<RadioGroup
  value={1}
  onChange={(value) => {
    const _v: number = value;
  }}
>
  <Radio value={1}>One</Radio>
  <Radio value={2}>Two</Radio>
</RadioGroup>;

<RadioGroup
  value={true}
  onChange={(value) => {
    const _v: boolean = value;
  }}
>
  <Radio value={true}>Yes</Radio>
  <Radio value={false}>No</Radio>
</RadioGroup>;

<RadioGroup
  value={1n}
  onChange={(value) => {
    const _v: bigint = value;
  }}
>
  <Radio value={1n}>One</Radio>
  <Radio value={2n}>Two</Radio>
</RadioGroup>;

// === Negative tests ===

// @ts-expect-error - 'xl' is not a valid size for RadioGroup
<RadioGroup size="xl">
  <Radio value="1">Invalid</Radio>
</RadioGroup>;
