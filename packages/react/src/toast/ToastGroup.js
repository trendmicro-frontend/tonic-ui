import { ensureArray } from 'ensure-type';
import React from 'react';
import { isElement, isValidElementType } from 'react-is';
import {
  TransitionGroup,
} from 'react-transition-group';
import { isNullish } from '@tonic-ui/utils';
import { useDefaultProps } from '../default-props';
import ToastController from './ToastController';
import ToastTransition from './ToastTransition';

const ToastGroup = (inProps) => {
  const {
    TransitionComponent = ToastTransition,
    TransitionProps,
    toasts,
    onClose: onCloseProp,
  } = useDefaultProps({ props: inProps, name: 'ToastGroup' });

  const closeById = (id) => () => {
    onCloseProp?.(id);
  };

  return (
    <TransitionGroup component={null}>
      {ensureArray(toasts).map((toast) => {
        if (isNullish(toast?.id)) {
          // TODO: log an error if the toast id is missing
          return null;
        }
        return (
          <TransitionComponent
            {...TransitionProps}
            key={toast.id}
            in={true}
            unmountOnExit
          >
            <ToastController
              duration={toast.duration}
              onClose={closeById(toast.id)}
            >
              {(() => {
                if (isElement(toast.content)) {
                  return toast.content;
                }
                if (isValidElementType(toast.content)) {
                  const ToastContent = toast.content;
                  return (
                    <ToastContent
                      id={toast.id}
                      data={toast.data}
                      onClose={closeById(toast.id)}
                      placement={toast.placement}
                    />
                  );
                }
                return null;
              })()}
            </ToastController>
          </TransitionComponent>
        );
      })}
    </TransitionGroup>
  );
};

ToastGroup.displayName = 'ToastGroup';

export default ToastGroup;
