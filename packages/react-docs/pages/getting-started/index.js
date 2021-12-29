import { ensureString } from 'ensure-type';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ASSET_PREFIX = ensureString(process.env.ASSET_PREFIX);

export default () => {
  const router = useRouter();

  useEffect(() => {
    router.push(`${ASSET_PREFIX}/getting-started/usage`);
  }, []);

  return null;
};
