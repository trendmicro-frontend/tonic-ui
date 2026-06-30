import React from 'react';
import {
  Toast,
  ToastCloseButton,
  ToastIcon,
  ToastMessage,
} from '@tonic-ui/react';

// Complete usage pattern
<Toast severity="success" isClosable onClose={() => console.log('close')}>
  <ToastIcon />
  <ToastMessage>Operation completed successfully!</ToastMessage>
  <ToastCloseButton />
</Toast>;
