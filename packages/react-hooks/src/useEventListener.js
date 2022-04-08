import { useEffect } from 'react';
import useEventCallback from './useEventCallback';

// TODO: move to '@tonic-ui/utils'
const noop = () => {};

// TODO: move to '@tonic-ui/utils'
const runIfFn = (valueOrFn, ...args) => {
  if (typeof valueOrFn === 'function') {
    return valueOrFn(...args);
  }
  return valueOrFn;
};

const useEventListener = (
  eventName,
  eventHandler,
  element,
  options,
) => {
  const eventListener = useEventCallback(eventHandler);

  useEffect(() => {
    const targetElement = runIfFn(element) ?? document;
    if (!(targetElement && targetElement.addEventListener)) {
      return noop;
    }

    targetElement.addEventListener(eventName, eventListener, options);

    return () => {
      targetElement.removeEventListener(eventName, eventListener, options);
    };
  }, [element, eventName, eventListener, options]);
};

export default useEventListener;
