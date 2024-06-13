import { Badge, Icon } from '@tonic-ui/react';
import React from 'react';

export default (props) => (
  <>
    <Badge variant="dot">
      <Icon icon="alert" size="4x" />
    </Badge>
    <Icon icon="alert" {...props} />
  </>
);
