import { Box, Divider, Text, Tooltip } from '@tonic-ui/react';

const App = () => {
  const backgroundColor = 'blue.600';
  const color = 'text._fixed.dark.accent';

  return (
    <>
      <Tooltip
        label="This is a tooltip"
        backgroundColor={backgroundColor}
        color={color}
      >
        <Text display="inline-block">Hover Me</Text>
      </Tooltip>
      <Divider my="4x" borderTopColor={color} />
      <Tooltip
        arrow={false}
        label={(
          <Box py="1x">
            <Text>Title</Text>
            <Divider my="2x" />
            <Text>Content</Text>
          </Box>
        )}
        backgroundColor={backgroundColor}
        color={color}
      >
        <Text display="inline-block">Hover Me</Text>
      </Tooltip>
    </>
  );
};

export default App;
