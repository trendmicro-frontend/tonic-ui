import { OverflowTooltip } from '@tonic-ui/react';
import React from 'react';

const App = () => {
  return (
    <OverflowTooltip
      label="This is a tooltip"
      placement="bottom"
    >
      This text string will be truncated when exceeding its container width. To see this in action, try resizing your browser viewport. If the text overflows, a tooltip will appear, displaying the full content.
    </OverflowTooltip>
  );
};

export default App;
