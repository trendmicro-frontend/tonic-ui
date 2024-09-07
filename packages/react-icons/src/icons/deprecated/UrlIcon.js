// AUTO-GENERATED FILE. DO NOT EDIT.
import { useOnce } from '@tonic-ui/react-hooks';
import React, { forwardRef } from 'react';
import URLIcon from '../URLIcon';

const UrlIcon = forwardRef((props, ref) => {
  useOnce(() => {
    console.error('Warning: The `UrlIcon` component is deprecated and will be removed in the next major release. Use the `URLIcon` component instead.');
  });

  return (
    <URLIcon ref={ref} {...props} />
  );
});

UrlIcon.displayName = 'URLIcon';
UrlIcon._isDeprecated = true;

export default UrlIcon;
