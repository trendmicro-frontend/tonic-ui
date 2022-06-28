import {
  isNullOrUndefined,
} from '@tonic-ui/utils';
import * as React from 'react';
import { mergeRefs } from './refs';

/**
 * React hook that merges react refs into a single memoized function
 *
 * @example
 * import React from "react";
 * import { useMergeRefs } from `@chakra-ui/hooks`;
 *
 * const Component = React.forwardRef((props, ref) => {
 *   const internalRef = React.useRef();
 *   return <div {...props} ref={useMergeRefs(internalRef, ref)} />;
 * });
 */
const useForkRef = (...refs) => {
  return React.useMemo(() => {
    if (refs.every((ref) => isNullOrUndefined(ref))) {
      return null;
    }
    return mergeRefs(...refs);
  }, refs); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useForkRef;
