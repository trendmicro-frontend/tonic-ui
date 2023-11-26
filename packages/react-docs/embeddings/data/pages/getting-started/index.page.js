import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Root = () => {
  const router = useRouter();

  // Mount only
  useEffect(() => {
    router.push(`/getting-started/usage`);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
};

export default Root;
