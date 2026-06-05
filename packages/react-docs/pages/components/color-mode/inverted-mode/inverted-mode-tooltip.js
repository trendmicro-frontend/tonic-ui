import {
  Divider,
  InvertedMode,
  Text,
  Tooltip,
} from '@tonic-ui/react';

const App = () => {
  return (
    <Tooltip
      label={(
        <InvertedMode width={80} py="1x">
          <Text>Title</Text>
          <Divider my="2x" />
          <Text>Content</Text>
        </InvertedMode>
      )}
    >
      <Text display="inline-block">Hover Me</Text>
    </Tooltip>
  );
};

export default App;
