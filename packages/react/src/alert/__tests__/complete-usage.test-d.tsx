import React from 'react';
import {
  Alert,
  AlertCloseButton,
  AlertIcon,
  AlertMessage,
  Icon,
} from '@tonic-ui/react';

// Complete usage pattern
<Alert
  severity="success"
  variant="solid"
  isClosable
  onClose={() => console.log('alert closed')}
>
  <AlertIcon />
  <AlertMessage>Operation completed successfully!</AlertMessage>
  <AlertCloseButton />
</Alert>;

<Alert severity="error" variant="outline">
  <AlertIcon />
  <AlertMessage>An error occurred</AlertMessage>
</Alert>;
