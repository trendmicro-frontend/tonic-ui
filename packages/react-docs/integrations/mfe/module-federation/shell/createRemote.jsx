import { Box, Spinner } from '@tonic-ui/react';
import { lazy, Suspense } from 'react';

// Component loader for Module Federation remotes. Wraps lazy() + Suspense so
// callers declare WHAT to load, not HOW to handle loading state.
//
// Usage:
//   export const WidgetOS = createRemote(() => import('widget_os/main'));

function LoadingSlot() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', p: '8x' }}>
      <Spinner />
    </Box>
  );
}

export function createRemote(importFactory) {
  const LazyComponent = lazy(importFactory);
  return function RemoteComponent(props) {
    return (
      <Suspense fallback={<LoadingSlot />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}
