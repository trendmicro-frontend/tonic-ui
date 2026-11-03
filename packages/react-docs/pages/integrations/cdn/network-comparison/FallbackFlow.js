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
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'stretch',
        gap: '3x',
        my: '6x',
      }}
    >
      {steps.map(([title, description], index) => (
        <Box
          key={title}
          sx={{
            display: 'flex',
            alignItems: 'stretch',
            flex: '1 1 170px',
            minWidth: 160,
          }}
        >
          {index > 0 && (
            <Text
              sx={{
                display: 'flex',
                alignItems: 'center',
                flex: 'none',
                margin: '0 2x',
                lineHeight: 1,
                color: theme.get('colors.text.tertiary'),
              }}
              aria-hidden="true"
            >
              →
            </Text>
          )}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              background: theme.get('colors.background.highest'),
              border: '1px solid',
              borderColor: theme.get('colors.border.subtle'),
              borderRadius: '3q',
              px: '4x',
              py: '3x',
            }}
          >
            <Text sx={{ fontWeight: 'semibold', mb: '1x' }}>
              {index + 1}. {title}
            </Text>
            <Text sx={{ fontSize: 'xs', color: theme.get('colors.text.secondary') }}>
              {description}
            </Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
