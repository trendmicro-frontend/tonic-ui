import { useEffect, useState } from 'react';

const useHydrated = () => {
  const [isHydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return isHydrated;
};

export default useHydrated;
