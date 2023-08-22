import { useCallback, useState } from 'react';

const useRefresh = () => {
  const [, rerender] = useState();
  return useCallback(() => {
    rerender({});
  }, []);
};

export default useRefresh;
