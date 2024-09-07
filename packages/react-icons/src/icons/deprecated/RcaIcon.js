// AUTO-GENERATED FILE. DO NOT EDIT.
import { useOnce } from '@tonic-ui/react-hooks';
import React, { forwardRef } from 'react';
import RCAIcon from '../RCAIcon';

const RcaIcon = forwardRef((props, ref) => {
  useOnce(() => {
    console.error('Warning: The `RcaIcon` component is deprecated and will be removed in the next major release. Use the `RCAIcon` component instead.');
  });

  return (
    <RCAIcon ref={ref} {...props} />
  );
});

RcaIcon.displayName = 'RCAIcon';
RcaIcon._isDeprecated = true;

export default RcaIcon;
