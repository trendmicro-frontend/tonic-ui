import React, { createRef } from 'react';
import { ToastCloseButton } from '@tonic-ui/react';

// Basic usage
<ToastCloseButton />;

// With onClick
<ToastCloseButton onClick={() => console.log('close')} />;

// Ref
const closeButtonRef = createRef<HTMLButtonElement>();
<ToastCloseButton ref={closeButtonRef} />;
