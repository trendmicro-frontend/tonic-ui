import { Badge, Icon } from '@tonic-ui/react';
import { AlertIcon } from '@tonic-ui/react-icons';
import React from 'react';

export default () => (
  <Badge variant="dot">
    <Icon as={AlertIcon} size="4x" />
  </Badge>
);
