/* eslint-disable react/no-unescaped-entities */
import { Box } from '@tonic-ui/react';
import React from 'react';

const Paragraph = (props) => (
  <Box
    as="p"
    _nthOfType={{
      '1': {
        fontWeight: 'bold'
      },
      '2n+1': {
        color: 'red:40',
      },
      '2n': {
        color: 'blue:40',
      }
    }}
    {...props}
  />
);

const App = () => (
  <>
    <Box>This element isn't counted.</Box>
    <Paragraph>1st paragraph.</Paragraph>
    <Paragraph>2nd paragraph.</Paragraph>
    <Box>This element isn't counted.</Box>
    <Paragraph>3rd paragraph.</Paragraph>
    <Paragraph>4th paragraph.</Paragraph>
  </>
);

export default App;
