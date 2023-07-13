import { useCallback, useState } from 'react';

const useForceUpdate = () => {
  const [, setValue] = useState({}); // eslint-disable-line react/hook-use-state

  return useCallback(() => {
    setValue(() => ({}));
  }, []);
};

export default useForceUpdate;
