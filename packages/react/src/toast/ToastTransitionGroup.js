import React from 'react';
import {
  TransitionGroup,
} from 'react-transition-group';
import { useDefaultProps } from '../default-props';

const ToastTransitionGroup = (inProps) => {
  const props = useDefaultProps({ props: inProps, name: 'ToastTransitionGroup' });

  return (
    <TransitionGroup
      component={null} // avoid a wrapping <div> element
      {...props}
    />
  );
};

ToastTransitionGroup.displayName = 'ToastTransitionGroup';

export default ToastTransitionGroup;
