// AUTO-GENERATED FILE. DO NOT EDIT.
import { useOnce } from '@tonic-ui/react-hooks';
import React, { forwardRef } from 'react';
import IOCIcon from '../IOCIcon';

const IocIcon = forwardRef((props, ref) => {
  useOnce(() => {
    console.error('Warning: The `IocIcon` component is deprecated and will be removed in the next major release. Use the `IOCIcon` component instead.');
  });

  return (
    <IOCIcon ref={ref} {...props} />
  );
});

IocIcon.displayName = 'IOCIcon';
IocIcon._isDeprecated = true;

export default IocIcon;
