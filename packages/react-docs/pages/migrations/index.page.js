import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Root = () => {
  const router = useRouter();

  // Mount only
  useEffect(() => {
    router.push('/migrations/migrating-from-v1-to-v2');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
};

export default Root;
