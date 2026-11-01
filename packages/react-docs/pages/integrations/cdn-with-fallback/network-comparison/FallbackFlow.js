import { Box, Text, useTheme } from '@tonic-ui/react';

const steps = [
  ['Application loads', 'bootstrap.js installs the import map before any module runs'],
  ['Runtime probes run', 'each group (react, react-dom, @tonic-ui/react) is verified'],
  ['Sources are selected', 'CDN when reachable, same-origin files otherwise'],
  ['Application mounts', 'React and Tonic UI resolve to one instance each'],
];

export default function FallbackFlow() {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '3x', margin: '4x 0' }}>
      {steps.map(([title, description], index) => (
        <Box key={title} sx={{ flex: '1 1 170px', minWidth: 160 }}>
          {index > 0 && (
            <Text
              sx={{ color: theme.get('colors.text.tertiary'), margin: '0 2x 0 0' }}
              aria-hidden="true"
            >
              →
            </Text>
          )}
          <Box
            sx={{
              background: theme.get('colors.background.highest'),
              border: '1px solid',
              borderColor: theme.get('colors.border.subtle'),
              borderRadius: '3q',
              padding: '2x 3x',
            }}
          >
            <Text sx={{ display: 'block', fontWeight: 'bold' }}>
              {index + 1}. {title}
            </Text>
            <Text sx={{ display: 'block', fontSize: 'xs', color: theme.get('colors.text.secondary') }}>
              {description}
            </Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
