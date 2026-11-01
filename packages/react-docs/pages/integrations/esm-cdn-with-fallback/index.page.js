import { Box, Link, Text } from '@tonic-ui/react';
import { useRouter } from 'next/router';
import { useOnce } from '@tonic-ui/react-hooks';

// The guide moved to /integrations/cdn-with-fallback/. The docs site is exported
// statically, so next.config `redirects` do not apply; this page keeps the old
// URL working.
const Redirect = () => {
  const router = useRouter();

  useOnce(() => {
    router.replace('/integrations/cdn-with-fallback/');
  });

  return (
    <Box p="4x">
      <Text as="h1">CDN loading strategies and fallback</Text>
      <Text>
        This page is now <Link href="/integrations/cdn-with-fallback/">CDN loading strategies and fallback</Link>.
      </Text>
    </Box>
  );
};

export default Redirect;
