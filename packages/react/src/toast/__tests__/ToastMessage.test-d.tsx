import React, { createRef } from 'react';
import { ToastMessage } from '@tonic-ui/react';

// Basic usage
<ToastMessage>This is the message</ToastMessage>;

// Ref
const messageRef = createRef<HTMLDivElement>();
<ToastMessage ref={messageRef}>Message</ToastMessage>;
