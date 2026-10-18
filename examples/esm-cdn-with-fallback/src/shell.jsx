import { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Box, Button, Dropdown, DropdownButton, Table, TableBody, TableCell,
  TableHeader, TableRow, Text,
  TonicProvider, useColorMode, useColorStyle,
} from '@tonic-ui/react';

const scenarios = [
  { id: 'cdn-first', label: 'CDN-first (all families via CDN)' },
  { id: 'react-package', label: 'React family fails' },
  { id: 'tonic-ui-react-package', label: '@tonic-ui/react CDN fails' },
  { id: 'all-cdn-fail', label: 'All CDN families fail' },
  { id: 'no-tonic-ui-react-cdn', label: 'No @tonic-ui/react CDN configuration' },
  { id: 'all-local', label: 'Use local for all groups' },
];

const families = [
  { id: 'react', label: 'React + JSX runtimes' },
  { id: 'react-dom', label: 'React DOM' },
  { id: '@tonic-ui/react', label: '@tonic-ui/react + Emotion + peers (one bundle)' },
];

const spinnerFrames = ['|', '/', '-', '\\'];

const readScenario = () => {
  const requested = new URL(location.href).searchParams.get('scenario');
  return scenarios.some(item => item.id === requested) ? requested : scenarios[0].id;
};

function Shell() {
  const [colorMode, setColorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const [scenario, setScenario] = useState(readScenario);
  const [runtime, setRuntime] = useState(null);
  const [log, setLog] = useState('Loading runtime...\n');
  const [progress, setProgress] = useState(null);
  const [manifest, setManifest] = useState(null);
  const [manifestOpen, setManifestOpen] = useState(false);
  const [spinnerFrame, setSpinnerFrame] = useState(0);
  const frameRef = useRef(null);
  const runRef = useRef(0);
  const loadingRef = useRef(true);
  const reportHeightRef = useRef(null);
  // Only the initial document carries `colorMode` in the URL so the first paint
  // uses the right theme. Later changes reach the frame through postMessage and
  // do not reset its fallback state.
  const initialSrc = useRef(`./runtime.html?colorMode=${colorMode}&scenario=${readScenario()}`).current;
  const [frameSrc, setFrameSrc] = useState(initialSrc);

  useEffect(() => {
    document.documentElement.setAttribute('data-color-scheme', colorMode);
  }, [colorMode]);

  useEffect(() => {
    if (window.parent === window) {
      return undefined;
    }
    const root = document.getElementById('root');
    const reportHeight = () => {
      if (loadingRef.current) {
        return;
      }
      const height = Math.ceil(root.getBoundingClientRect().height);
      if (height > 0) {
        window.parent.postMessage(
          { type: 'cdn-runtime:resize', height },
          window.location.origin
        );
      }
    };
    reportHeightRef.current = reportHeight;
    const observer = new ResizeObserver(reportHeight);
    observer.observe(root);
    reportHeight();
    return () => {
      observer.disconnect();
      reportHeightRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!progress) {
      return undefined;
    }
    const timer = setInterval(() => {
      setSpinnerFrame(frame => (frame + 1) % spinnerFrames.length);
    }, 150);
    return () => clearInterval(timer);
  }, [progress]);

  useEffect(() => {
    const frame = frameRef.current;
    const sendColorMode = (value) => frame?.contentWindow?.postMessage(
      { type: 'cdn-runtime:color-mode', value }, window.location.origin
    );
    const onMessage = (event) => {
      if (event.origin !== window.location.origin) {
        return;
      }
      const data = event.data;
      if (event.source === frame?.contentWindow) {
        if (data?.type === 'cdn-runtime:ready') {
          sendColorMode(colorMode);
        } else if (data?.type === 'cdn-runtime:log' && typeof data.value === 'string') {
          setLog(data.value);
        } else if (data?.type === 'cdn-runtime:progress') {
          setSpinnerFrame(0);
          setProgress(data.value);
        } else if (data?.type === 'cdn-runtime:complete' && data.runtime) {
          loadingRef.current = false;
          setProgress(null);
          setRuntime(data.runtime);
          setLog(data.runtime.log);
          requestAnimationFrame(() => reportHeightRef.current?.());
        }
        return;
      }
      if (data?.type === 'cdn-runtime:color-mode' && event.source === window.parent &&
        (data.value === 'dark' || data.value === 'light')) {
        setColorMode(data.value);
      }
    };
    window.addEventListener('message', onMessage);
    sendColorMode(colorMode);
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'cdn-runtime:ready' }, window.location.origin);
    }
    return () => window.removeEventListener('message', onMessage);
  }, [colorMode, setColorMode]);

  useEffect(() => {
    const url = new URL(location.href);
    url.searchParams.set('scenario', scenario);
    history.replaceState(null, '', url);
  }, [scenario]);

  useEffect(() => {
    let active = true;
    // The manifest lives beside the shell document in every output layout, so
    // the shell reads the same file the runtime frame bootstrap loads.
    fetch(new URL('./runtime-manifest.json', location.href).href)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Cannot load the runtime manifest: ${response.status}`);
        }
        return response.text();
      })
      .then(text => {
        if (active) {
          setManifest(text);
        }
      })
      .catch(error => {
        if (active) {
          setManifest(`${error.message}\n`);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  const loadScenario = (id) => {
    loadingRef.current = true;
    setScenario(id);
    setLog(`Loading scenario: ${id}...\n`);
    setProgress(null);
    runRef.current += 1;
    setFrameSrc(`./runtime.html?colorMode=${colorMode}&scenario=${id}&run=${runRef.current}`);
  };

  return (
    <Box p="4x" backgroundColor={colorStyle.background.primary} color={colorStyle.color.primary}>
      <Text mb="4x">Choose a scenario to inspect which runtime families use CDN or local files before the app mounts.</Text>
      <Box mb="4x">
        <Text id="scenario-label" mb="2x">Scenario</Text>
        <Box display="flex" gap="2x" alignItems="center" flexWrap="wrap">
          <Dropdown
            items={scenarios}
            value={scenarios.find(item => item.id === scenario) || scenarios[0]}
            onChange={item => loadScenario(item.id)}
            renderToggle={({ renderItem, value }) => (
              <DropdownButton id="scenario" aria-labelledby="scenario-label scenario">
                {renderItem(value)}
              </DropdownButton>
            )}
          />
          <Button id="retry" variant="secondary" onClick={() => loadScenario(scenario)}>Retry</Button>
        </Box>
      </Box>
      <Table
        layout="table"
        variant="outline"
        width="100%"
        aria-label="Selected runtime sources"
      >
        <TableHeader>
          <TableRow>
            <TableCell>Atomic family</TableCell>
            <TableCell>Selected source</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {families.map(family => (
            <TableRow key={family.id}>
              <TableCell as="th" scope="row" textAlign="left">{family.label}</TableCell>
              <TableCell id={`${family.id.replace(/^@/, '').replace(/\//g, '-')}-source`} textAlign="left">
                {runtime?.selected[family.id] === 'cdn'
                  ? runtime.cdnSourceNames[family.id]
                  : runtime?.selected[family.id] === 'local' ? 'Local (same origin)' : 'Pending'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box
        as="pre"
        id="runtime-log"
        mt="4x"
        p="3x"
        backgroundColor={colorStyle.background.secondary}
        aria-live="polite"
        sx={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}
      >
        {log}
        {progress ? (
          <span data-runtime-progress aria-label={`Loading ${progress.group} from ${progress.source}`}>
            <span data-runtime-spinner aria-hidden>
              {spinnerFrames[spinnerFrame]}
            </span>
            {' '}
            {`${progress.group}: ${progress.source}`}
          </span>
        ) : null}
      </Box>
      <Box mt="4x">
        <Box display="flex" gap="2x" alignItems="center" mb="2x">
          <Button
            id="manifest-toggle"
            variant="secondary"
            aria-expanded={manifestOpen}
            onClick={() => setManifestOpen(open => !open)}
          >
            {manifestOpen ? 'Hide runtime manifest' : 'Show runtime manifest'}
          </Button>
        </Box>
        {manifestOpen ? (
          <Box
            as="pre"
            id="runtime-manifest"
            p="3x"
            backgroundColor={colorStyle.background.secondary}
            sx={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}
          >
            {manifest ?? 'Loading manifest...\n'}
          </Box>
        ) : null}
      </Box>
      <Box
        as="iframe"
        ref={frameRef}
        src={frameSrc}
        title="Runtime loader"
        tabIndex={-1}
        aria-hidden
        sx={{ display: 'none' }}
      />
    </Box>
  );
}

export function mount(element) {
  const requested = new URL(location.href).searchParams.get('colorMode');
  const defaultValue = requested === 'dark' ? 'dark' : 'light';
  createRoot(element).render(
    <TonicProvider colorMode={{ defaultValue }} useCSSBaseline={true} useCSSVariables={true}>
      <Shell />
    </TonicProvider>,
  );
}
