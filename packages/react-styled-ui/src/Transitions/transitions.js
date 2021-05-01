import {
  ensureArray,
  ensureFiniteNumber,
} from 'ensure-type';

const formatMs = ms => {
  return (ms > 0) ? `${Math.round(ms)}ms` : '';
};

export const transitionDuration = {
  // most basic recommended timing
  standard: 300,
  // recommended when something is entering screen
  enteringScreen: 225,
  // recommended when something is leaving screen
  leavingScreen: 195,
};

export const transitionEasing = {
  // This is the most common easing curve.
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  // Objects enter the screen at full velocity from off-screen and slowly decelerate to a resting point.
  easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
};

export const getEnterTransitionProps = ({
  style,
  timeout,
  easing,
}) => {
  timeout = timeout?.enter ?? timeout;
  easing = easing?.enter ?? easing;

  return {
    duration: (style?.transitionDuration) ?? (typeof timeout === 'number' ? ensureFiniteNumber(timeout) : (timeout || 0)),
    easing: (style?.transitionTimingFunction) ?? easing,
    delay: style?.transitionDelay,
  };
};

export const getExitTransitionProps = ({
  style,
  timeout,
  easing,
}) => {
  timeout = (timeout?.exit) ?? timeout;
  easing = (easing?.exit) ?? easing;

  return {
    duration: (style?.transitionDuration) ?? (typeof timeout === 'number' ? ensureFiniteNumber(timeout) : (timeout || 0)),
    easing: (style?.transitionTimingFunction) ?? easing,
    delay: style?.transitionDelay,
  };
};

export const createTransitionStyle = (props = ['all'], options) => {
  const {
    duration = transitionDuration.standard,
    easing = transitionEasing.easeInOut,
    delay = 0,
  } = { ...options };

  return ensureArray(props).map(transitionProp => {
    const parts = [
      transitionProp,
      typeof duration === 'string' ? duration : formatMs(duration),
      easing,
      typeof delay === 'string' ? delay : formatMs(delay),
    ].filter(x => (x !== undefined && x !== null && x !== ''));
    return parts.join(' ');
  }).join(',');
};
