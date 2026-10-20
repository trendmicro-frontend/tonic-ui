import { useEffect } from 'react';
import { destroyApp } from 'wujie';

/**
 * Manages the lifecycle of a Wujie micro-app.
 *
 * Wujie keeps the sub-app sandbox and shadow DOM cached after the WujieReact wrapper unmounts.
 * Without destroying the app, stale state may persist when switching apps (e.g. styles injected during an interrupted interaction).
 *
 * @param {string} name - The name of the Wujie micro-app.
 * @param {Object} options - Lifecycle options.
 * @param {boolean} [options.destroyOnUnmount=false] - Whether to destroy the cached app when the wrapper unmounts. Set to `false` to keep Wujie's default keep-alive behavior.
 * @returns {void}
 */
const useMicroAppLifecycle = (name, { destroyOnUnmount = false } = {}) => {
  useEffect(() => {
    if (!destroyOnUnmount) {
      return undefined;
    }
    return () => {
      destroyApp(name);
    };
  }, [name, destroyOnUnmount]);
};

export default useMicroAppLifecycle;
