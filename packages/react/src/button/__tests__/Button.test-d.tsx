import React, { createRef } from 'react';
import { Button } from '@tonic-ui/react';

// === Button ===
<Button>Click me</Button>;

// With variant
<Button variant="primary">Primary</Button>;
<Button variant="secondary">Secondary</Button>;
<Button variant="default">Default</Button>;
<Button variant="ghost">Ghost</Button>;
<Button variant="emphasis">Emphasis</Button>;

// With size
<Button size="sm">Small</Button>;
<Button size="md">Medium</Button>;
<Button size="lg">Large</Button>;

// With disabled
<Button disabled>Disabled</Button>;
<Button disabled={false}>Enabled</Button>;

// With selected
<Button selected>Selected</Button>;
<Button selected={false}>Not Selected</Button>;

// With onClick
<Button onClick={(e) => console.log(e.currentTarget)}>Clickable</Button>;

// StyleProps
<Button padding="4x" margin="2x" backgroundColor="blue:50">Styled</Button>;

// Ref
const buttonRef = createRef<HTMLButtonElement>();
<Button ref={buttonRef}>With Ref</Button>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to Button
<Button ref={wrongRef}>Wrong Ref</Button>;

// === Negative tests ===
// @ts-expect-error - 'invalid' is not a valid variant
<Button variant="invalid">Invalid variant</Button>;

// @ts-expect-error - 'xl' is not a valid size for Button
<Button size="xl">Invalid size</Button>;
