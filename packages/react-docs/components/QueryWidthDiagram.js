import { Box, Text } from '@tonic-ui/react';

const mediaExample = `@media (width >= 48rem) {
  /* Viewport styles */
}`;
const containerExample = `@container (width >= 14rem) {
  /* Container styles */
}`;
const exampleStyle = {
  border: 1,
  borderRadius: 'lg',
  color: 'text.primary',
  fontFamily: 'mono',
  lineHeight: 1.5,
  m: 0,
  p: '4x',
  whiteSpace: 'pre-wrap',
};

const QueryWidthDiagram = () => (
  <Box
    as="figure"
    aria-label="Width measured by each query"
    sx={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 18rem), 1fr))',
      gap: 'clamp(1.25rem, 3vw, 2rem)',
      maxWidth: '68rem',
      mx: 0,
      my: '6x',
      p: 'clamp(0.75rem, 2vw, 1.5rem)',
    }}
  >
    <Box
      as="svg"
      viewBox="0 0 440 360"
      role="img"
      aria-label="A media query measures the viewport inside the app window, excluding the toolbar. Inside the viewport, Header spans Nav and Main. The container query measures Main only."
      sx={{
        display: 'block',
        width: '100%',
        color: 'border.primary',
        '& .diagram-screen': { color: 'text.secondary' },
        '& .diagram-bezel': { fill: 'var(--tonic-colors-gray-900)' },
        '& .diagram-display': { fill: 'var(--tonic-colors-background-medium)' },
        '& .diagram-viewport': { color: '_link.enabled' },
        '& .diagram-container': { color: 'success.icon' },
        '& .diagram-toolbar': { fill: 'var(--tonic-colors-_foreground-secondary-enabled)' },
        '& .diagram-pane': { fill: 'var(--tonic-colors-_foreground-secondary-enabled)' },
        '& .diagram-close': { color: 'error.icon' },
        '& .diagram-hardware': { color: 'gray.500' },
        '& .diagram-minimize': { color: 'warning.icon' },
        '& .diagram-maximize': { color: 'success.icon' },
      }}
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect className="diagram-bezel" x="4" y="40" width="432" height="312" rx="12" />
        <rect className="diagram-display" x="14" y="52" width="412" height="288" rx="4" />
        <path d="M3 62v22M36 39h17m6 0h17" strokeLinecap="round" strokeWidth="2.5" />
        <path className="diagram-toolbar" d="M46 120v-18a8 8 0 0 1 8-8h332a8 8 0 0 1 8 8v18Z" />
        <path d="M46 120h348v188H46z" />
        <rect className="diagram-pane" x="66" y="136" width="308" height="30" rx="4" />
        <rect className="diagram-pane" x="66" y="180" width="88" height="82" rx="4" />
        <rect className="diagram-pane diagram-container" x="168" y="180" width="206" height="82" rx="4" />
      </g>
      <g fill="currentColor">
        <rect className="diagram-hardware" x="192" y="332" width="56" height="3" rx="1.5" />
        <circle className="diagram-close" cx="60" cy="107" r="4" />
        <circle className="diagram-minimize" cx="74" cy="107" r="4" />
        <circle className="diagram-maximize" cx="88" cy="107" r="4" />
      </g>
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3">
        <path className="diagram-screen" d="M4 23v10m0-5h432m0-5v10" />
        <path className="diagram-viewport" d="M46 80v8m0-4h348m0-4v8" />
        <path className="diagram-container" d="M168 270v12m0-6h206m0-6v12" />
      </g>
      <g fill="currentColor" fontSize="15" textAnchor="middle">
        <text className="diagram-screen" x="220" y="17">Device screen</text>
        <text className="diagram-viewport" x="220" y="74">Viewport size</text>
        <text className="diagram-screen" x="220" y="156">Header</text>
        <text className="diagram-screen" x="110" y="226">Nav</text>
        <text className="diagram-screen" x="271" y="226">Main</text>
        <text className="diagram-container" x="271" y="299">Container size</text>
      </g>
    </Box>
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '6x', py: '2x', minWidth: 0 }}>
      <Box>
        <Text sx={{ fontSize: 'md', fontWeight: 'semibold', mb: '1x' }}>Media query (viewport size)</Text>
        <Text sx={{ mb: '3x' }}>Measures the app viewport, not the whole device screen.</Text>
        <Box as="pre" sx={{ ...exampleStyle, bg: 'info._overlay', borderColor: 'info.border' }}>
          <Box as="code">{mediaExample}</Box>
        </Box>
      </Box>
      <Box>
        <Text sx={{ fontSize: 'md', fontWeight: 'semibold', mb: '1x' }}>Container query (container size)</Text>
        <Text sx={{ mb: '3x' }}>Measures the Main container outlined in green, not the whole viewport.</Text>
        <Box as="pre" sx={{ ...exampleStyle, bg: 'success._overlay', borderColor: 'success.border' }}>
          <Box as="code">{containerExample}</Box>
        </Box>
      </Box>
    </Box>
  </Box>
);

export default QueryWidthDiagram;
