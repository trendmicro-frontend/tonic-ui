import { Text, Textarea, TextLabel } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <>
    <TextLabel mb="1x">Label:</TextLabel>
    <Textarea placeholder="Basic example" />
    <Text size="xs" mt="1x">Help text for the text input</Text>
  </>
);

export default App;
