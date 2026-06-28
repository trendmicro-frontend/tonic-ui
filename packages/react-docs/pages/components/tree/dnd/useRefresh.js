import { useCallback, useReducer } from 'react';

const useRefresh = () => {
  const [, rerender] = useReducer(x => !x, false);
  return useCallback(() => {
    rerender();
  }, [rerender]);
};

export default useRefresh;
