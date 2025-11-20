import {
  Box,
  Divider,
  Highlight,
  Stack,
  Text,
  useColorStyle,
} from '@tonic-ui/react';
import React from 'react';

const App = () => {
  const [colorStyle] = useColorStyle();
  const singleQueryText = 'This is a test. Another test here. Final test.';
  const multipleQueryText = 'React is a JavaScript library for building user interfaces. Each React component can be reused. React makes it easy to create interactive UIs with component-based architecture.';

  return (
    <Stack direction="column" spacing="4x">
      {/* Single query example */}
      <Box>
        <Text fontSize="md" fontWeight="semibold" mb="2x">
          Single query
        </Text>
        <Stack spacing="3x">
          <Box>
            <Text color={colorStyle.color.secondary}>
              {`matchAll={true} - highlights all occurrences:`}
            </Text>
            <Highlight query="test" matchAll={true}>
              {singleQueryText}
            </Highlight>
          </Box>
          <Box>
            <Text color={colorStyle.color.secondary}>
              {`matchAll={false} - highlights only first occurrence:`}
            </Text>
            <Highlight query="test" matchAll={false}>
              {singleQueryText}
            </Highlight>
          </Box>
        </Stack>
      </Box>

      <Divider />

      {/* Multiple queries example */}
      <Box>
        <Text fontSize="md" fontWeight="semibold" mb="2x">
          Multiple queries
        </Text>
        <Stack spacing="3x">
          <Box>
            <Highlight query={['React', 'component']}>
              {multipleQueryText}
            </Highlight>
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
};

export default App;
