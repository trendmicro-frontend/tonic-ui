import React, { createRef } from 'react';
import { ButtonBox } from '@tonic-ui/react';

// === ButtonBox ===
<ButtonBox />;

// With children
<ButtonBox>Click me</ButtonBox>;

// disabled
<ButtonBox disabled />;

// onClick
<ButtonBox onClick={() => {}} />;

// as
<ButtonBox as="span" />;

// StyleProps
<ButtonBox px="4x" />;

// Ref
const ref = createRef<HTMLDivElement>();
<ButtonBox ref={ref} />;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to ButtonBox
<ButtonBox ref={wrongRef} />;
