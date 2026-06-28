import React, { createRef } from 'react';
import { TextLabel } from '@tonic-ui/react';

// === TextLabel ===
<TextLabel>Label</TextLabel>;

// With size
<TextLabel size="xs">Extra Small</TextLabel>;
<TextLabel size="sm">Small</TextLabel>;
<TextLabel size="md">Medium</TextLabel>;
<TextLabel size="lg">Large</TextLabel>;
<TextLabel size="xl">Extra Large</TextLabel>;
<TextLabel size="2xl">2XL</TextLabel>;
<TextLabel size="3xl">3XL</TextLabel>;
<TextLabel size="4xl">4XL</TextLabel>;

// With htmlFor
<TextLabel htmlFor="input-id">Form Label</TextLabel>;

// StyleProps
<TextLabel color="gray:50" fontWeight="bold">Styled</TextLabel>;

// Ref
const labelRef = createRef<HTMLLabelElement>();
<TextLabel ref={labelRef}>Label</TextLabel>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to TextLabel
<TextLabel ref={wrongRef}>Label</TextLabel>;

// === Negative tests ===
// @ts-expect-error - 'xxl' is not a valid size for TextLabel
<TextLabel size="xxl">Invalid size</TextLabel>;
