import {
  Box,
  Flex,
  TonicProvider,
  createTheme,
} from '@tonic-ui/react';
import { useState } from 'react';
import { createRoot } from 'react-dom/client';

import GlobalStyles from './GlobalStyles';
import Layout from './Layout';
import { WidgetUpdates, WidgetOS, InventoryView } from './apps';

// Color mode is persisted by the docs app to localStorage; read it once at module
// scope. The docs page remounts this iframe on color-mode change so the value is
// always fresh.
const colorMode = localStorage.getItem('tonic-ui-color-mode') === 'dark' ? 'dark' : 'light';

const theme = createTheme();

function DashboardView() {
  return (
    <Flex sx={{ flexWrap: 'wrap', gap: '4x', p: '4x', alignItems: 'flex-start' }}>
      <Box sx={{ flex: '1 1 280px', height: 320 }}>
        <WidgetUpdates colorMode={colorMode} />
      </Box>
      <Box sx={{ flex: '1 1 280px', height: 320 }}>
        <WidgetOS colorMode={colorMode} />
      </Box>
    </Flex>
  );
}

function App() {
  const [activeView, setActiveView] = useState('dashboard');

  return (
    <TonicProvider
      theme={theme}
      colorMode={{ value: colorMode }}
      useCSSBaseline
    >
      <GlobalStyles />
      <Layout
        label="Wujie"
        activeView={activeView}
        onSelectView={setActiveView}
      >
        {activeView === 'dashboard' && <DashboardView />}
        {activeView === 'inventory' && <InventoryView colorMode={colorMode} />}
      </Layout>
    </TonicProvider>
  );
}

createRoot(document.getElementById('root')).render(<App />);
