import React, { createRef } from 'react';
import { ModalFooter, Button } from '@tonic-ui/react';

// === ModalFooter ===
<ModalFooter>
  <Button>Cancel</Button>
  <Button>Save</Button>
</ModalFooter>;

// With children
<ModalFooter>
  <div>Footer content</div>
</ModalFooter>;

// StyleProps
<ModalFooter padding="4x">
  <Button>OK</Button>
</ModalFooter>;
<ModalFooter margin="2x">
  <Button>OK</Button>
</ModalFooter>;
<ModalFooter justifyContent="flex-end">
  <Button>OK</Button>
</ModalFooter>;

// Ref
const footerRef = createRef<HTMLDivElement>();
<ModalFooter ref={footerRef}>
  <Button>OK</Button>
</ModalFooter>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to ModalFooter
<ModalFooter ref={wrongRef}>
  <Button>OK</Button>
</ModalFooter>;
