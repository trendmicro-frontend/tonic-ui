import React, { createRef } from 'react';
import { Skeleton } from '@tonic-ui/react';

// === Skeleton ===
<Skeleton />;

// With variant
<Skeleton variant="text" />;
<Skeleton variant="rectangle" />;
<Skeleton variant="circle" />;

// With animation
<Skeleton animation="pulse" />;
<Skeleton animation="wave" />;

// With dimensions
<Skeleton width={200} height={100} />;
<Skeleton width="100%" height="20px" />;

// Combined
<Skeleton variant="rectangle" animation="wave" width={200} height={100} />;
<Skeleton variant="circle" animation="pulse" width={48} height={48} />;

// StyleProps
<Skeleton borderRadius="md" />;

// Ref
const skeletonRef = createRef<HTMLDivElement>();
<Skeleton ref={skeletonRef} />;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to Skeleton
<Skeleton ref={wrongRef} />;

// === Negative tests ===
// @ts-expect-error - 'oval' is not a valid variant for Skeleton
<Skeleton variant="oval" />;

// @ts-expect-error - 'fade' is not a valid animation for Skeleton
<Skeleton animation="fade" />;
