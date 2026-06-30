import React from 'react';
import {
  TransitionGroup,
} from 'react-transition-group';
import { useDefaultProps } from '../default-props';

/**
 * @typedef {Object} ToastTransitionGroupProps
 * @property {React.ReactNode} [children] - A set of `<Transition>` components, that are toggled `in` and `out` as they leave.
 * @property {boolean} [appear] - A convenience prop that enables or disables appear animations for all children. Note that specifying this will override any defaults set on individual children Transitions.
 * @property {boolean} [enter] - A convenience prop that enables or disables enter animations for all children. Note that specifying this will override any defaults set on individual children Transitions.
 * @property {boolean} [exit] - A convenience prop that enables or disables exit animations for all children. Note that specifying this will override any defaults set on individual children Transitions.
 */

/**
 * @type {StyledFC<ToastTransitionGroupProps>}
 */
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
