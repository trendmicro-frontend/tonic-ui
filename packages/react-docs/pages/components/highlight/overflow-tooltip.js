import { Box, Highlight, OverflowTooltip } from '@tonic-ui/react';

const App = () => {
  const textToHighlight = 'This text contains the word highlight which will be highlighted.';

  return (
    <Box width={300}>
      <OverflowTooltip label={textToHighlight}>
        <Highlight query="highlight">
          {textToHighlight}
        </Highlight>
      </OverflowTooltip>
    </Box>
  );
};

export default App;
