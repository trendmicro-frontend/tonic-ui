import React, { useState } from 'react';
import { Checkbox, CheckboxGroup } from '@tonic-ui/react';

// === CheckboxGroup ===
<CheckboxGroup>
  <Checkbox value="1">Option 1</Checkbox>
  <Checkbox value="2">Option 2</Checkbox>
</CheckboxGroup>;

// Controlled
<CheckboxGroup
  value={['1', '2']}
  onChange={(values) => {
    const _v: string[] = values;
  }}
>
  <Checkbox value="1">Option 1</Checkbox>
  <Checkbox value="2">Option 2</Checkbox>
</CheckboxGroup>;

// Uncontrolled with defaultValue
<CheckboxGroup defaultValue={['1']}>
  <Checkbox value="1">Option 1</Checkbox>
  <Checkbox value="2">Option 2</Checkbox>
</CheckboxGroup>;

// Other props
<CheckboxGroup name="options" disabled>
  <Checkbox value="1">Option 1</Checkbox>
</CheckboxGroup>;

// Size variants
<CheckboxGroup size="sm"><Checkbox value="1">Small</Checkbox></CheckboxGroup>;
<CheckboxGroup size="md"><Checkbox value="1">Medium</Checkbox></CheckboxGroup>;
<CheckboxGroup size="lg"><Checkbox value="1">Large</Checkbox></CheckboxGroup>;

// Render prop (children as function)
<CheckboxGroup>
  {(context) => (
    <>
      <Checkbox value="1">Option 1 (size: {context.size})</Checkbox>
      <Checkbox value="2">Option 2</Checkbox>
    </>
  )}
</CheckboxGroup>;

// === Generic value type (T) ===

enum Color { Red = 'red', Blue = 'blue' }

// String enum — onChange infers T from value prop
<CheckboxGroup
  value={[Color.Red]}
  onChange={(values) => {
    const _v: Color[] = values;
  }}
>
  <Checkbox value={Color.Red}>Red</Checkbox>
  <Checkbox value={Color.Blue}>Blue</Checkbox>
</CheckboxGroup>;

// String enum with useState — pass setter directly
function EnumCheckboxExample() {
  const [colors, setColors] = useState([Color.Red]);
  return (
    <CheckboxGroup value={colors} onChange={setColors}>
      <Checkbox value={Color.Red}>Red</Checkbox>
      <Checkbox value={Color.Blue}>Blue</Checkbox>
    </CheckboxGroup>
  );
}

// Existing string usage still works (backward compatible)
<CheckboxGroup
  value={['1', '2']}
  onChange={(values) => {
    const _v: string[] = values;
  }}
>
  <Checkbox value="1">Option 1</Checkbox>
</CheckboxGroup>;

// Other combinations
<CheckboxGroup
  value={[null]}
  onChange={(values) => {
    const _v: (string | null)[] = values;
  }}
>
  <Checkbox value="foo">Foo</Checkbox>
  <Checkbox value="bar">Bar</Checkbox>
</CheckboxGroup>;

<CheckboxGroup
  value={[1, 2]}
  onChange={(values) => {
    const _v: number[] = values;
  }}
>
  <Checkbox value={1}>One</Checkbox>
  <Checkbox value={2}>Two</Checkbox>
</CheckboxGroup>;

<CheckboxGroup
  value={[true, false]}
  onChange={(values) => {
    const _v: boolean[] = values;
  }}
>
  <Checkbox value={true}>True</Checkbox>
  <Checkbox value={false}>False</Checkbox>
</CheckboxGroup>;

<CheckboxGroup
  value={[1n, 2n]}
  onChange={(values) => {
    const _v: bigint[] = values;
  }}
>
  <Checkbox value={1n}>One</Checkbox>
  <Checkbox value={2n}>Two</Checkbox>
</CheckboxGroup>;

// === Negative tests ===

// @ts-expect-error - 'xl' is not a valid size for CheckboxGroup
<CheckboxGroup size="xl">
  <Checkbox value="1">Invalid</Checkbox>
</CheckboxGroup>;
