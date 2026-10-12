import { Box, Link, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, useColorMode } from '@tonic-ui/react';
import { useState } from 'react';

// Two micro frontend mechanisms side-by-side.
//
// "Module Federation" tab — the shell iframe loads
//   `/mfe/module-federation/shell/index.html`, which uses @module-federation/vite
//   to load remotes at runtime and render them directly in the shell document.
//   EnvironmentProvider defaults to the iframe's own document (no shadow root).
//
// "Wujie" tab  — the host iframe loads `/mfe/wujie/index.html`, which runs
//   wujie-react to project a sub-app DOM into a shadow root.  EnvironmentProvider
//   is configured to the shadow root so portal-based components (Modal, Popper,
//   Tooltip) resolve to the correct realm.
//
// Only the ACTIVE tab's iframe is mounted (lazy) so each demo starts fresh when
// you switch.  key="${tab}-${colorMode}" remounts the iframe on color-mode change;
// the MFE reads color mode from localStorage (same origin as the docs app).

const basePath = process.env.TONIC_UI_REACT_DOCS_BASE_PATH || '';

const TABS = [
  {
    id: 'module-federation',
    label: 'Module Federation',
    getSrc: () => `${basePath}/mfe/module-federation/shell/index.html`,
    title: 'Tonic components inside a Module Federation micro frontend',
  },
  {
    id: 'wujie',
    label: 'Wujie',
    getSrc: () => `${basePath}/mfe/wujie/index.html`,
    title: 'Tonic components inside a Wujie micro frontend',
  },
];

const App = () => {
  const [colorMode] = useColorMode();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const activeTab = TABS[activeTabIndex];
  const activeSrc = activeTab.getSrc();

  return (
    <Tabs index={activeTabIndex} onChange={setActiveTabIndex}>
      <TabList>
        {TABS.map((tab) => (
          <Tab key={tab.id}>{tab.label}</Tab>
        ))}
      </TabList>
      <TabPanels>
        {TABS.map((tab, i) => (
          <TabPanel key={tab.id}>
            {activeTabIndex === i && (
              <Stack direction="column" spacing="3x">
                <Box py="2x">
                  <Link href={activeSrc} target="_blank" rel="noopener noreferrer">
                    Open {tab.label} demo in a new window ↗
                  </Link>
                </Box>
                <Box
                  as="iframe"
                  key={`${tab.id}-${colorMode}`}
                  src={activeSrc}
                  title={tab.title}
                  border={1}
                  borderColor="border.secondary"
                  sx={{
                    width: '100%',
                    height: 640,
                  }}
                />
              </Stack>
            )}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default App;
