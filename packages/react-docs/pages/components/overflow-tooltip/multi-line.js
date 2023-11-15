import { Box, Divider, OverflowTooltip, Text } from '@tonic-ui/react';
import React from 'react';

const App = () => {
  return (
    <>
      <Box width={360}>
        <OverflowTooltip
          label="This is a tooltip"
        >
          {({ ref, style }) => (
            <Text
              ref={ref}
              style={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 3,
                overflow: 'hidden',
              }}
            >
              This text string will be truncated when exceeding its container width. To see this in action, try resizing your browser viewport. If the text overflows, a tooltip will appear, displaying the full content.
            </Text>
          )}
        </OverflowTooltip>
      </Box>
      <Divider my="4x" />
      <Box width={480}>
        <OverflowTooltip
          label="This is a tooltip"
        >
          {({ ref, style }) => (
            <Text
              ref={ref}
              style={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 3,
                overflow: 'hidden',
              }}
            >
              This text string will be truncated when exceeding its container width. To see this in action, try resizing your browser viewport. If the text overflows, a tooltip will appear, displaying the full content.
            </Text>
          )}
        </OverflowTooltip>
      </Box>
    </>
  );
};

export default App;
