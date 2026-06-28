import React, { createRef } from 'react';
import { AlertMessage } from '@tonic-ui/react';

// Basic usage
<AlertMessage>This is the message</AlertMessage>;

// Ref
const messageRef = createRef<HTMLDivElement>();
<AlertMessage ref={messageRef}>Message</AlertMessage>;
