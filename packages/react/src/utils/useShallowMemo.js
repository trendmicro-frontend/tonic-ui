import { memoize } from 'micro-memoize';
import { useRef } from 'react';

const useShallowMemo = () => {
  return useRef(memoize(v => v, { isKeyItemEqual: 'shallow' })).current;
};

export default useShallowMemo;
