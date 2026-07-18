import React, { createRef } from 'react';
import { LinearProgress } from '@tonic-ui/react';

// === LinearProgress ===
<LinearProgress />;

// With value
<LinearProgress value={75} />;

// With min/max
<LinearProgress value={75} min={0} max={100} />;

// With variant
<LinearProgress variant="determinate" value={50} />;
<LinearProgress variant="indeterminate" />;

// With color
<LinearProgress color="blue:50" />;

// With height
<LinearProgress height={4} />;
<LinearProgress height="2x" />;

// With width
<LinearProgress width="100%" />;

// StyleProps
<LinearProgress padding="2x" />;

// Ref
const linearRef = createRef<HTMLDivElement>();
<LinearProgress ref={linearRef} />;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to LinearProgress
<LinearProgress ref={wrongRef} />;

// === Negative tests ===
// @ts-expect-error - 'loading' is not a valid variant for LinearProgress
<LinearProgress variant="loading" />;
