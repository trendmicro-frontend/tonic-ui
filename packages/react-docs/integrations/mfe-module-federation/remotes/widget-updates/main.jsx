import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { TonicProvider } from '@tonic-ui/react';
import App from './App.jsx';

const cache = createCache({ key: 'widget-updates', prepend: true });

// Exposed Module Federation entry. The shell lazy-loads this and passes colorMode.
export default function RemoteApp({ colorMode = 'light' }) {
  return (
    <CacheProvider value={cache}>
      <TonicProvider colorMode={{ value: colorMode }}>
        <App />
      </TonicProvider>
    </CacheProvider>
  );
}
