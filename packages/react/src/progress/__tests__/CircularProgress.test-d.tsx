import React, { createRef } from 'react';
import { CircularProgress } from '@tonic-ui/react';

// === CircularProgress ===
<CircularProgress />;

// With value
<CircularProgress value={50} />;

// With min/max
<CircularProgress value={50} min={0} max={100} />;

// With size
<CircularProgress size={16} />;
<CircularProgress size={24} />;
<CircularProgress size={48} />;

// With variant
<CircularProgress variant="determinate" value={50} />;
<CircularProgress variant="indeterminate" />;

// With thickness
<CircularProgress thickness={2} />;
<CircularProgress thickness={4} />;

// With color
<CircularProgress color="blue:50" />;

// StyleProps
<CircularProgress padding="2x" />;

// Ref
const circularRef = createRef<HTMLDivElement>();
<CircularProgress ref={circularRef} />;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to CircularProgress
<CircularProgress ref={wrongRef} />;

// === Negative tests ===
// @ts-expect-error - 'loading' is not a valid variant for CircularProgress
<CircularProgress variant="loading" />;
