import React, { createRef } from 'react';
import { ModalHeader } from '@tonic-ui/react';

// === ModalHeader ===
<ModalHeader>Modal Title</ModalHeader>;

// With children
<ModalHeader>
  <span>Title with icon</span>
</ModalHeader>;

// StyleProps
<ModalHeader padding="4x">Title</ModalHeader>;
<ModalHeader margin="2x">Title</ModalHeader>;
<ModalHeader fontSize="xl">Title</ModalHeader>;

// Ref
const headerRef = createRef<HTMLDivElement>();
<ModalHeader ref={headerRef}>Header</ModalHeader>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to ModalHeader
<ModalHeader ref={wrongRef}>Header</ModalHeader>;
