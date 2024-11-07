import React from 'react';
import { useDefaultProps } from '../default-props';
import ToastController from './ToastController';
import ToastTransition from './ToastTransition';

const ToastTransitionController = (inProps) => {
  const {
    TransitionComponent = ToastTransition,
    TransitionProps,
    children,
    duration: durationProp = null,
    onClose: onCloseProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'ToastTransitionController' });

  return (
    <TransitionComponent
      in={true}
      unmountOnExit
      {...TransitionProps}
      {...rest}
    >
      <ToastController
        duration={durationProp}
        onClose={onCloseProp}
      >
        {children}
      </ToastController>
    </TransitionComponent>
  );
};

ToastTransitionController.displayName = 'ToastTransitionController';

export default ToastTransitionController;
