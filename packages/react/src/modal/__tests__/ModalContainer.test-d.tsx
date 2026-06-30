import React, { createRef } from 'react';
import { ModalContainer, ModalContent } from '@tonic-ui/react';

// === ModalContainer ===
<ModalContainer>
  <ModalContent>Content</ModalContent>
</ModalContainer>;

// With children
<ModalContainer>
  <ModalContent>Modal content here</ModalContent>
</ModalContainer>;

// StyleProps
<ModalContainer padding="4x">
  <ModalContent>Content</ModalContent>
</ModalContainer>;
<ModalContainer margin="2x">
  <ModalContent>Content</ModalContent>
</ModalContainer>;

// Ref
const containerRef = createRef<HTMLDivElement>();
<ModalContainer ref={containerRef}>
  <ModalContent>Content</ModalContent>
</ModalContainer>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to ModalContainer
<ModalContainer ref={wrongRef}>
  <ModalContent>Content</ModalContent>
</ModalContainer>;
