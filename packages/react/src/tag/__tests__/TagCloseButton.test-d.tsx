import React, { createRef } from 'react';
import { TagCloseButton } from '@tonic-ui/react';

// === TagCloseButton ===
<TagCloseButton />;

// With onClick
<TagCloseButton onClick={() => console.log('close')} />;

// With children
<TagCloseButton>X</TagCloseButton>;

// StyleProps
<TagCloseButton padding="1x" />;

// Ref
const closeButtonRef = createRef<HTMLButtonElement>();
<TagCloseButton ref={closeButtonRef} />;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to TagCloseButton
<TagCloseButton ref={wrongRef} />;
