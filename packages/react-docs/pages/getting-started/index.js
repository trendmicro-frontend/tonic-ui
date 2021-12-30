import { ensureString } from 'ensure-type';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ASSET_PREFIX = ensureString(process.env.ASSET_PREFIX);

const Root = () => {
  const router = useRouter();

  // Mount only
  useEffect(() => {
    router.push(`${ASSET_PREFIX}/getting-started/usage`);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
};

export default Root;
