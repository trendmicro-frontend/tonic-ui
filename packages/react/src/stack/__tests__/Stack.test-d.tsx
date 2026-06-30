import React, { createRef } from 'react';
import { Stack } from '@tonic-ui/react';

// === Stack ===
<Stack>
  <div>Item 1</div>
  <div>Item 2</div>
</Stack>;

// With shouldWrapChildren
<Stack shouldWrapChildren>
  <div>Item 1</div>
  <div>Item 2</div>
</Stack>;

// Style shorthands — plain values
<Stack direction="row" spacing="4x" gap="4x">Items</Stack>;

// Style shorthands — responsive objects
<Stack
  direction={{ _: 'column', md: 'row' }}
  spacing={{ _: '2x', md: '4x' }}
  gap={{ _: '4x', md: '5x', lg: '6x' }}
>
  <div>Item 1</div>
  <div>Item 2</div>
</Stack>;

// StyleProps
<Stack padding="4x">Styled</Stack>;

// Ref
const stackRef = createRef<HTMLDivElement>();
<Stack ref={stackRef}>Stack</Stack>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to Stack
<Stack ref={wrongRef}>Stack</Stack>;
