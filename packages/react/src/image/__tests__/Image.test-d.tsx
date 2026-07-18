import React, { createRef } from 'react';
import { Image } from '@tonic-ui/react';

// === Image ===
<Image src="/image.jpg" alt="Description" />;

// With native img attributes
<Image src="/image.jpg" alt="Description" loading="lazy" />;
<Image src="/image.jpg" alt="Description" width={200} height={100} />;
<Image src="/image.jpg" alt="Description" crossOrigin="anonymous" />;

// StyleProps
<Image src="/image.jpg" alt="Description" borderRadius="md" />;

// Ref
const imageRef = createRef<HTMLImageElement>();
<Image ref={imageRef} src="/image.jpg" alt="Description" />;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to Image
<Image ref={wrongRef} src="/image.jpg" alt="Description" />;
