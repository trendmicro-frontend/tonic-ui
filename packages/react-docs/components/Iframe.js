import { Box } from '@tonic-ui/react';
import { useMergeRefs } from '@tonic-ui/react-hooks';
import { forwardRef } from 'react';
import useIframeEvents from '../hooks/useIframeEvents';

const noop = () => {};

const defaultSandbox = {
  allowForms: true,
  allowModals: true,
  allowPointerLock: false,
  allowPopups: true,
  allowSameOrigin: true,
  allowScripts: true,
  allowTopNavigation: false,
};

const mapSandbox = sandbox => Object.keys(sandbox)
  .filter(key => sandbox[key])
  .map(key => key.replace(/[A-Z]/g, '-$&').toLowerCase())
  .join(' ');

/**
 * @param {{ src?: string, width?: number|string, height?: number|string, title?: string,
 * sandbox?: boolean|string|object, style?: object,
 * onLoad?: (payload: {event: Event, iframe: HTMLIFrameElement}) => void,
 * onBeforeUnload?: (payload: {event: Event, iframe: HTMLIFrameElement}) => void,
 * onError?: (event: Event) => void,
 * onUnload?: (payload: {event: Event}) => void, [key: string]: unknown }} props
 */
const Iframe = forwardRef(({
  width = '100%',
  height = '100%',
  title = 'Custom widget',
  sandbox = defaultSandbox,
  style,
  onLoad = noop,
  onBeforeUnload = noop,
  onUnload = noop,
  onError,
  ...rest
}, ref) => {
  const iframeRef = useIframeEvents({ onLoad, onBeforeUnload, onUnload, onError });
  const combinedRef = useMergeRefs(iframeRef, ref);

  let sandboxValue = sandbox;
  if (sandbox === false) {
    sandboxValue = undefined;
  } else if (sandbox === true) {
    sandboxValue = '';
  } else if (sandbox && typeof sandbox === 'object') {
    sandboxValue = mapSandbox(sandbox);
  }

  return (
    <Box
      as="iframe"
      display="block"
      {...rest}
      ref={combinedRef}
      width={width}
      height={height}
      title={title}
      sandbox={sandboxValue}
      style={{ borderWidth: 0, ...style }}
    />
  );
});

Iframe.displayName = 'Iframe';

export default Iframe;
