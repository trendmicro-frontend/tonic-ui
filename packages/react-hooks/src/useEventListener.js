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
  event, // the event name
  handler, // the event handler function to execute
  env, // the DOM environment to execute against (defaults to `document`)
  options // the event listener options
) => {
  const listener = useEventCallback(handler);

  useEffect(() => {
    const node = runIfFn(env) ?? document;

    if (!handler) {
      return noop;
    }

    node.addEventListener(event, listener, options);
    return () => {
      node.removeEventListener(event, listener, options);
    };
  }, [event, env, options, listener, handler]);

  return () => {
    const node = runIfFn(env) ?? document;
    node.removeEventListener(event, listener, options);
  };
};

export default useEventListener;
