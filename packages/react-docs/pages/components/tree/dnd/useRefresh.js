import { useCallback, useReducer } from 'react';

const useRefresh = () => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  return useCallback(() => {
    forceUpdate();
  }, []);
};

export default useRefresh;
