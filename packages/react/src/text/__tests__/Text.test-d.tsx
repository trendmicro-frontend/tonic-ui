import React, { createRef } from 'react';
import { Text } from '@tonic-ui/react';

// === Text ===
<Text>Hello World</Text>;

// With size
<Text size="xs">Extra Small</Text>;
<Text size="sm">Small</Text>;
<Text size="md">Medium</Text>;
<Text size="lg">Large</Text>;
<Text size="xl">Extra Large</Text>;
<Text size="2xl">2XL</Text>;
<Text size="3xl">3XL</Text>;
<Text size="4xl">4XL</Text>;

// StyleProps
<Text color="gray:50" fontWeight="bold">Styled</Text>;

// Ref
const textRef = createRef<HTMLDivElement>();
<Text ref={textRef}>Text</Text>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to Text
<Text ref={wrongRef}>Text</Text>;

// === Negative tests ===
// @ts-expect-error - 'xxl' is not a valid size for Text
<Text size="xxl">Invalid size</Text>;
