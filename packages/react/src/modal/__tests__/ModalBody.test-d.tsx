import React, { createRef } from 'react';
import { ModalBody } from '@tonic-ui/react';

// === ModalBody ===
<ModalBody>Modal body content</ModalBody>;

// With children
<ModalBody>
  <p>Paragraph content</p>
  <p>More content</p>
</ModalBody>;

// StyleProps
<ModalBody padding="4x">Content</ModalBody>;
<ModalBody margin="2x">Content</ModalBody>;
<ModalBody overflowY="auto">Content</ModalBody>;

// Ref
const bodyRef = createRef<HTMLDivElement>();
<ModalBody ref={bodyRef}>Body</ModalBody>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to ModalBody
<ModalBody ref={wrongRef}>Body</ModalBody>;
