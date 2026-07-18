import React, { createRef } from 'react';
import { Space } from '@tonic-ui/react';

// === Space ===
<Space />;

// With width and height
<Space width="100px" />;
<Space height="50px" />;
<Space width={100} height={50} />;
<Space width="4x" height="4x" />;

// StyleProps
<Space margin="2x" />;

// Ref
const spaceRef = createRef<HTMLDivElement>();
<Space ref={spaceRef} />;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to Space
<Space ref={wrongRef} />;
