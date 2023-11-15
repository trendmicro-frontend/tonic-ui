import { Icon, Flex, OverflowTooltip, Text } from '@tonic-ui/react';
import React from 'react';

const App = () => {
  return (
    <OverflowTooltip
      label="This is a tooltip"
    >
      {({ ref, style }) => (
        <Flex alignItems="center" columnGap="2x">
          <Icon icon="menu" />
          <Text ref={ref} {...style}>
            This text string will be truncated when exceeding its container width. To see this in action, try resizing your browser viewport. If the text overflows, a tooltip will appear, displaying the full content.
          </Text>
        </Flex>
      )}
    </OverflowTooltip>
  );
};

export default App;
