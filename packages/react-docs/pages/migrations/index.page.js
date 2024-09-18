import { useRouter } from 'next/router';
import { useOnce } from '@tonic-ui/react-hooks';

const Root = () => {
  const router = useRouter();

  useOnce(() => {
    router.push('/migrations/migrating-from-v0-to-v1');
  });

  return null;
};

export default Root;
