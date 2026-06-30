import React, { createRef } from 'react';
import { Divider } from '@tonic-ui/react';

// === Divider ===
<Divider />;

// With orientation
<Divider orientation="horizontal" />;
<Divider orientation="vertical" />;

// With variant
<Divider variant="solid" />;
<Divider variant="dashed" />;
<Divider variant="dotted" />;

// Combined
<Divider orientation="vertical" variant="dashed" />;

// StyleProps
<Divider margin="4x" />;

// Ref
const dividerRef = createRef<HTMLHRElement>();
<Divider ref={dividerRef} />;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to Divider
<Divider ref={wrongRef} />;

// === Negative tests ===
// @ts-expect-error - 'double' is not a valid variant for Divider
<Divider variant="double" />;

// @ts-expect-error - 'diagonal' is not a valid orientation for Divider
<Divider orientation="diagonal" />;
