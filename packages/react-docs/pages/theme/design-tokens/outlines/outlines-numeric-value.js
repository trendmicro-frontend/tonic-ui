import { useState } from 'react';
import { Button, Flex, Space, Stack, Text, TextLabel, useColorMode, useTheme } from '@tonic-ui/react';

const Block = (props) => {
  return (
    <Flex
      px="4x"
      py="3x"
      alignItems="flex-start"
      justifyContent="center"
      flexDirection="column"
      backgroundColor="background.high"
      {...props}
    />
  );
};

const App = () => {
  const theme = useTheme();
  const [colorMode] = useColorMode();
  const outlineColor = {
    dark: 'gray:60',
    light: 'gray:30',
  }[colorMode];
  const outlineWidths = [1, 2, 3, 4, 5];
  const [outlineWidth, setOutlineWidth] = useState(outlineWidths[0]);
  const outlineValue = theme.get('outlines.' + outlineWidth) || outlineWidth;
  const outlineColorValue = theme.get('colors.' + outlineColor) || outlineColor;

  return (
    <>
      <Flex alignItems="center" mb="5x">
        <TextLabel>outline =</TextLabel>
        <Space width="2x" />
        <Stack direction="row" spacing="2x">
          {outlineWidths.map((width) => (
            <Button
              key={width}
              onClick={() => setOutlineWidth(width)}
              variant={width === outlineWidth ? 'primary' : 'secondary'}
            >
              <Text fontFamily="mono">{width}</Text>
            </Button>
          ))}
        </Stack>
      </Flex>
      <Flex>
        <Block
          outline={outlineWidth}
          outlineColor={outlineColor}
        >
          <Text>outline="{outlineValue}"</Text>
          <Text>outlineColor="{outlineColorValue}"</Text>
        </Block>
      </Flex>
    </>
  );
};

export default App;
