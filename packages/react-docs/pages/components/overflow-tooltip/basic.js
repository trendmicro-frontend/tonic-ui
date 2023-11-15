import { Box, Divider, OverflowTooltip } from '@tonic-ui/react';
import React from 'react';

const App = () => {
  return (
    <>
      <OverflowTooltip
        label="This is a tooltip"
      >
        This text string will be truncated when exceeding its container width. To see this in action, try resizing your browser viewport. If the text overflows, a tooltip will appear, displaying the full content.
      </OverflowTooltip>
      <Divider my="4x" />
      <Box width={140.7}>
        <OverflowTooltip
          label="This is a tooltip"
        >
          This text string is truncted
        </OverflowTooltip>
      </Box>
      <Divider my="4x" />
      <OverflowTooltip
        label="This is a tooltip"
      >
        This text string is not truncated
      </OverflowTooltip>
    </>
  );
};

export default App;
