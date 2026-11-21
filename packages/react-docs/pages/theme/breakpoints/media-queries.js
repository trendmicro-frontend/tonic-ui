import { Box, Code, Text, createTheme } from '@tonic-ui/react';
import { pixelBreakpoints } from './pixel-breakpoints.mjs';

const { breakpoints } = createTheme({ breakpoints: pixelBreakpoints });

const queries = [
  ['gte-sm', "gte('sm')", breakpoints.gte('sm')],
  ['lt-sm', "lt('sm')", breakpoints.lt('sm')],
  ['between-sm-md', "between('sm', 'md')", breakpoints.between('sm', 'md')],
  ['only-md', "only('md')", breakpoints.only('md')],
];

const App = () => {
  return (
    <Box role="region" aria-label="Media query examples" display="flex" flexDirection="column" gap="3x">
      <Box role="list" aria-label="Media query matches" sx={{ display: 'grid', gap: '2x' }}>
        {queries.map(([id, helper, query]) => (
          <Box
            key={id}
            role="listitem"
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              columnGap: '4x',
              rowGap: '1x',
              px: '3x',
              py: '2x',
              backgroundColor: 'background.high',
              borderRadius: 'sm',
            }}
          >
            <Box sx={{ minWidth: 0, overflowWrap: 'anywhere' }}>
              <Code sx={{ whiteSpace: 'normal' }}>{helper}</Code>
              <Text sx={{ fontFamily: 'mono', fontSize: 'sm', color: 'text.secondary' }}>{query}</Text>
            </Box>
            <Box sx={{ fontSize: 'sm' }}>
              <Text
                sx={{ display: 'block', color: 'text.secondary', [query]: { display: 'none' } }}
              >
                No match
              </Text>
              <Text
                data-testid={`breakpoint-${id}`}
                sx={{ display: 'none', fontWeight: 'semibold', [query]: { display: 'block' } }}
              >
                Matches
              </Text>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default App;
