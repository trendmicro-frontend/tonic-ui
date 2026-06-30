import React, { createRef } from 'react';
import { ModalContent } from '@tonic-ui/react';

// === ModalContent ===
<ModalContent>Modal content here</ModalContent>;

// With children
<ModalContent>
  <div>Content goes here</div>
</ModalContent>;

// StyleProps
<ModalContent padding="4x">Content</ModalContent>;
<ModalContent margin="2x">Content</ModalContent>;
<ModalContent backgroundColor="white">Content</ModalContent>;

// Ref
const contentRef = createRef<HTMLDivElement>();
<ModalContent ref={contentRef}>Content</ModalContent>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to ModalContent
<ModalContent ref={wrongRef}>Content</ModalContent>;
