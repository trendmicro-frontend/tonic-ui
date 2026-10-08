import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Box, Button, Dropdown, DropdownButton, Flex, Link, Text,
  TonicProvider, useColorMode, useColorStyle,
} from '@tonic-ui/react';

const scenarios = [
  { id: 'cdn-first', label: 'CDN-first (real esm.sh modules)' },
  { id: 'tonic-package', label: 'Tonic bundled entry fails' },
  { id: 'react-package', label: 'React DOM client fails' },
  { id: 'emotion-package', label: 'Emotion styled/base fails' },
  { id: 'no-tonic-cdn', label: 'No paired Tonic CDN descriptor' },
  { id: 'all-cdn-fail', label: 'All three CDN groups fail' },
  { id: 'all-local', label: 'Use local for all groups' },
];
const families = [
  { id: 'react', label: 'React + React DOM + JSX runtimes' },
  { id: 'emotion', label: 'Emotion + its mapped subpaths' },
  { id: 'tonic', label: 'Tonic UI bundled entry' },
];

function selectScenario(scenario) {
  const next = new URL(location.href);
  next.searchParams.set('scenario', scenario);
  next.searchParams.delete('__local');
  next.searchParams.delete('__failed');
  location.assign(next);
}

function App({ runtime }) {
  const [count, setCount] = useState(0);
  const [colorMode, setColorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const toggleColorMode = () => setColorMode(value => value === 'dark' ? 'light' : 'dark');
  useEffect(() => {
    document.documentElement.setAttribute('data-color-scheme', colorMode);
    document.getElementById('bootstrap-status').hidden = true;
  }, [colorMode]);
  const cellProps = { p: '2x', border: 1, borderColor: colorStyle.divider, textAlign: 'left' };
  return React.createElement(Box, {
    p: '4x', minHeight: '100vh', backgroundColor: colorStyle.background.primary, color: colorStyle.color.primary,
  },
  React.createElement(Text, { as: 'h1', fontSize: '2xl', mb: '2x' }, 'CDN-first runtime groups'),
  React.createElement(Text, { mb: '4x' }, 'One local app loads React, necessary Emotion peers and a single Tonic UI bundled entry from public esm.sh. No Module Federation or Wujie is used.'),
  React.createElement(Flex, { alignItems: 'center', flexWrap: 'wrap', gap: '2x', mb: '4x' },
    React.createElement(Text, { id: 'scenario-label' }, 'Failure scenario'),
    React.createElement(Dropdown, {
      items: scenarios,
      value: scenarios.find(item => item.id === runtime.scenario) || scenarios[0],
      onChange: item => selectScenario(item.id),
      renderToggle: ({ renderItem, value }) => React.createElement(DropdownButton, {
        id: 'scenario', 'aria-labelledby': 'scenario-label scenario',
      }, renderItem(value)),
    }),
    React.createElement(Button, { id: 'retry', variant: 'secondary', onClick: () => selectScenario(runtime.scenario) }, 'Retry from CDN-first')),
  React.createElement(Box, { as: 'table', width: '100%', sx: { borderCollapse: 'collapse' }, 'aria-label': 'Selected runtime sources' },
    React.createElement('thead', null,
      React.createElement('tr', null,
        React.createElement(Box, { as: 'th', ...cellProps }, 'Atomic family'),
        React.createElement(Box, { as: 'th', ...cellProps }, 'Selected source'))),
    React.createElement('tbody', null, families.map(family => React.createElement('tr', { key: family.id },
      React.createElement(Box, { as: 'th', scope: 'row', ...cellProps }, family.label),
      React.createElement(Box, { as: 'td', id: `${family.id}-source`, ...cellProps }, runtime.selected[family.id] === 'cdn' ? 'CDN (esm.sh)' : 'Local (same origin)'))))),
  React.createElement(Box, { py: '4x' },
    React.createElement(Text, { as: 'h2', fontSize: 'xl', mb: '4x' }, 'Standalone CDN-first app'),
    React.createElement(Text, { id: 'app-theme', mb: '2x' }, `App theme: ${colorMode}`),
    React.createElement(Button, { variant: 'primary', onClick: () => setCount(value => value + 1), id: 'app-counter' }, `App clicks: ${count}`),
    React.createElement(Button, { ml: '2x', variant: 'secondary', onClick: toggleColorMode, id: 'theme-toggle' }, 'Toggle theme')),
  React.createElement(Box, { as: 'details', open: true, mb: '4x' },
    React.createElement('summary', null, 'Load log'),
    React.createElement(Box, { as: 'pre', id: 'runtime-log', p: '3x', backgroundColor: colorStyle.background.secondary, sx: { whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' } }, runtime.log)),
  React.createElement(Box, { as: 'details', mb: '4x' },
    React.createElement('summary', null, 'Exact package versions from this build'),
    React.createElement(Box, { as: 'pre', id: 'versions', sx: { whiteSpace: 'pre-wrap' } }, JSON.stringify(runtime.versions, null, 2))),
  React.createElement(Link, { href: runtime.manifestUrl, target: '_blank', rel: 'noopener noreferrer' }, 'Inspect the generated runtime descriptor and esm.sh URLs'),
  React.createElement(Text, { mt: '4x' }, 'Failure presets map a chosen CDN import to an intentionally missing same-origin module. Use DevTools with cache disabled to test a real CDN outage. Group failures reload this iframe before mounting; they do not change the parent docs runtime.'));
}

export function mount(element, runtime) {
  createRoot(element).render(React.createElement(TonicProvider, { useCSSBaseline: true, useCSSVariables: true },
    React.createElement(App, { runtime })));
}
