import React, { createRef } from 'react';
import { Button, ButtonGroup } from '@tonic-ui/react';

// === ButtonGroup ===
<ButtonGroup>
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</ButtonGroup>;

// With orientation
<ButtonGroup orientation="horizontal">
  <Button>Button 1</Button>
</ButtonGroup>;
<ButtonGroup orientation="vertical">
  <Button>Button 1</Button>
</ButtonGroup>;

// With variant
<ButtonGroup variant="primary">
  <Button>Button</Button>
</ButtonGroup>;
<ButtonGroup variant="secondary">
  <Button>Button</Button>
</ButtonGroup>;
<ButtonGroup variant="default">
  <Button>Button</Button>
</ButtonGroup>;
<ButtonGroup variant="ghost">
  <Button>Button</Button>
</ButtonGroup>;
<ButtonGroup variant="emphasis">
  <Button>Button</Button>
</ButtonGroup>;

// With size
<ButtonGroup size="sm">
  <Button>Button</Button>
</ButtonGroup>;
<ButtonGroup size="md">
  <Button>Button</Button>
</ButtonGroup>;
<ButtonGroup size="lg">
  <Button>Button</Button>
</ButtonGroup>;

// With disabled
<ButtonGroup disabled>
  <Button>Button</Button>
</ButtonGroup>;

// With render prop (children as function)
<ButtonGroup variant="primary">
  {(context) => (
    <Button>Variant: {context.variant}</Button>
  )}
</ButtonGroup>;

// StyleProps
<ButtonGroup padding="2x">
  <Button>Button</Button>
</ButtonGroup>;

// Ref
const buttonGroupRef = createRef<HTMLDivElement>();
<ButtonGroup ref={buttonGroupRef}>
  <Button>Button</Button>
</ButtonGroup>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to ButtonGroup
<ButtonGroup ref={wrongRef}>
  <Button>Button</Button>
</ButtonGroup>;

// === Negative tests ===
// @ts-expect-error - 'invalid' is not a valid variant for ButtonGroup
<ButtonGroup variant="invalid">
  <Button>Button</Button>
</ButtonGroup>;

// @ts-expect-error - 'xl' is not a valid size for ButtonGroup
<ButtonGroup size="xl">
  <Button>Button</Button>
</ButtonGroup>;

// @ts-expect-error - 'diagonal' is not a valid orientation for ButtonGroup
<ButtonGroup orientation="diagonal">
  <Button>Button</Button>
</ButtonGroup>;
