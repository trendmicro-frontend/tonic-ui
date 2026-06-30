import React, { createRef } from 'react';
import { AlertCloseButton } from '@tonic-ui/react';

// Basic usage
<AlertCloseButton />;

// With onClick
<AlertCloseButton onClick={() => console.log('close clicked')} />;

// Ref
const closeButtonRef = createRef<HTMLButtonElement>();
<AlertCloseButton ref={closeButtonRef} />;
