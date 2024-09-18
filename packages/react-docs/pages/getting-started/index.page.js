import { useRouter } from 'next/router';
import { useOnce } from '@tonic-ui/react-hooks';

const Root = () => {
  const router = useRouter();

  useOnce(() => {
    router.push('/getting-started/usage');
  });

  return null;
};

export default Root;
