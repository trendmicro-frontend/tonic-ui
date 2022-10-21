import {
  createTransitionStyle,
  getEnterTransitionProps,
  getExitTransitionProps,
  transitionDuration,
  transitionEasing,
} from '..';

const defaultEasing = {
  enter: transitionEasing.easeInOut,
  exit: transitionEasing.easeInOut,
};

const defaultTimeout = {
  enter: transitionDuration.standard,
  exit: transitionDuration.standard,
};

it('should return the duration config', () => {
  expect(transitionDuration).toEqual({
    standard: 300,
    enteringScreen: 225,
    leavingScreen: 195,
  });
});

it('should return the easing config', () => {
  expect(transitionEasing).toEqual({
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  });
});

it('should return the expected transition props', () => {
  const style = {
    transitionDuration: '2s',
    transitionTimingFunction: 'ease-in-out',
    transitionDelay: '100ms',
  };
  const timeout = defaultTimeout;
  const easing = defaultEasing;

  expect(getEnterTransitionProps({ timeout, easing })).toEqual({
    duration: 300,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    delay: undefined,
  });

  expect(getExitTransitionProps({ timeout, easing })).toEqual({
    duration: 300,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    delay: undefined,
  });

  expect(getEnterTransitionProps({ style, timeout, easing })).toEqual({
    duration: '2s',
    easing: 'ease-in-out',
    delay: '100ms',
  });

  expect(getExitTransitionProps({ style, timeout, easing })).toEqual({
    duration: '2s',
    easing: 'ease-in-out',
    delay: '100ms',
  });
});

it('should return the expected transition style', () => {
  const transitionProps = getEnterTransitionProps({ timeout: defaultTimeout, easing: defaultEasing });
  const transition = [
    createTransitionStyle('height', transitionProps),
    createTransitionStyle('opacity', transitionProps),
    createTransitionStyle('transform', {
      duration: transitionProps.duration * 0.666,
      easing: transitionProps.easing,
      delay: transitionProps.delay || (transitionProps.duration * 0.333),
    }),
  ].join(', ');
  expect(transition).toBe('height 300ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms cubic-bezier(0.4, 0, 0.2, 1), transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 100ms');
});
