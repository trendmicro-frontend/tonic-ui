import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { TonicProvider } from '@tonic-ui/react';
import { createMicroApp } from '../micro-app';
import App from './App';

const microApp = createMicroApp(() => document.getElementById('app-root'));

microApp.render(({ colorMode }) => {
  const cache = createCache({ key: 'widget-os', prepend: true });
  return (
    <CacheProvider value={cache}>
      <TonicProvider colorMode={{ value: colorMode }} useCSSBaseline>
        <App />
      </TonicProvider>
    </CacheProvider>
  );
});
