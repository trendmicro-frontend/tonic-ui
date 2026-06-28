import React, { createRef } from 'react';
import { Truncate } from '@tonic-ui/react';

// === Truncate ===
<Truncate>
  This is a very long text that should be truncated when it exceeds the container width
</Truncate>;

// StyleProps
<Truncate width={200} padding="2x">
  Truncated content with fixed width
</Truncate>;

// Ref
const truncateRef = createRef<HTMLDivElement>();
<Truncate ref={truncateRef}>With ref</Truncate>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to Truncate
<Truncate ref={wrongRef}>Wrong ref</Truncate>;
