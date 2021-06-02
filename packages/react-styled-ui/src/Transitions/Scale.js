import { ensureArray } from 'ensure-type';
import React, {
  forwardRef,
  useEffect,
  useRef,
} from 'react';
import { Transition } from 'react-transition-group';
import {
  createTransitionStyle,
  getEnterTransitionProps,
  getExitTransitionProps,
  transitionEasing,
} from './transitions';
import reflow from '../utils/reflow';
import useForkRef from '../utils/useForkRef';
import PseudoBox from '../PseudoBox';

const mapStateToVariantStyle = (state, props) => {
  const variantStyle = {
    entering: {
      transform: 'none',
    },
    entered: {
      transform: 'none',
    },
    exiting: (props) => {
      const [scaleX, scaleY] = ensureArray(props.initialScale);
      return {
        transform: (scaleY !== undefined)
          ? `scale(${scaleX}, ${scaleY})`
          : `scale(${scaleX})`,
      };
    },
    exited: (props) => {
      const [scaleX, scaleY] = ensureArray(props.initialScale);
      return {
        transform: (scaleY !== undefined)
          ? `scale(${scaleX}, ${scaleY})`
          : `scale(${scaleX})`,
      };
    },
  }[state];

  return (typeof variantStyle === 'function') ? variantStyle(props) : variantStyle;
};

const defaultEasing = {
  enter: transitionEasing.easeOut,
  exit: transitionEasing.easeIn,
};

const defaultInitialScale = [
  0.95, // sx
  0.95, // sy
];

const defaultTimeout = {
  enter: 150,
  exit: 150,
};

const Scale = forwardRef((
  {
    appear = true,
    children,
    easing = defaultEasing,
    in: inProp,
    initialScale = defaultInitialScale,
    style,
    timeout = defaultTimeout,
    ...other
  },
  ref,
) => {
  const nodeRef = useRef(null);
  const combinedRef = useForkRef(nodeRef, ref);

  useEffect(() => {
    if (inProp) {
      const node = nodeRef.current;
      reflow(node); // force reflow to make the transition work when animating appearance
    }
  }, [inProp]);

  return (
    <Transition
      appear={appear}
      in={inProp}
      nodeRef={nodeRef}
      timeout={timeout}
      {...other}
    >
      {(state, childProps) => {
        const transitionProps = inProp
          ? getEnterTransitionProps({ style, timeout, easing })
          : getExitTransitionProps({ style, timeout, easing });
        const transition = createTransitionStyle('transform', transitionProps);
        const variantStyle = mapStateToVariantStyle(state, { initialScale });
        const styleProps = {
          ...variantStyle,
          transition,
          visibility: (state === 'exited' && !inProp) ? 'hidden' : undefined,
        };

        if (typeof children === 'function') {
          return children(state, {
            ...childProps,
            ref: combinedRef,
            style: {
              ...styleProps,
              ...style,
            },
          });
        }

        return (
          <PseudoBox
            ref={combinedRef}
            {...childProps}
            {...styleProps}
            style={style}
          >
            {children}
          </PseudoBox>
        );
      }}
    </Transition>
  );
});

Scale.displayName = 'Scale';

export default Scale;
