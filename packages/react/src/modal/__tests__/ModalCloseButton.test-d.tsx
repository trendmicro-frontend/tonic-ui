import React, { createRef } from 'react';
import { ModalCloseButton } from '@tonic-ui/react';

// === ModalCloseButton ===
<ModalCloseButton />;

// With onClick
<ModalCloseButton onClick={() => console.log('close')} />;
<ModalCloseButton onClick={(event) => console.log('clicked', event)} />;

// StyleProps
<ModalCloseButton padding="2x" />;
<ModalCloseButton margin="1x" />;
<ModalCloseButton color="gray:60" />;

// Ref
const closeButtonRef = createRef<HTMLButtonElement>();
<ModalCloseButton ref={closeButtonRef} />;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to ModalCloseButton
<ModalCloseButton ref={wrongRef} />;
