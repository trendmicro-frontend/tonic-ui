import * as React from 'react';
import { mergeRefs } from './refs';

const useForkRef = (...refs) => {
  /**
   * This will create a new function if the ref props change and are defined.
   * This means React will call the old forkRef with `null` and the new forkRef
   * with the ref. Cleanup naturally emerges from this behavior.
   */
  return React.useMemo(() => {
    return mergeRefs(...refs);
  }, [...refs]); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useForkRef;
