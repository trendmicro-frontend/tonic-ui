/* eslint-disable react/no-unescaped-entities */
import { Button, Flex, Space, Stack, Text, TextLabel, useColorMode, useColorStyle, useTheme } from '@tonic-ui/react';
import React, { useState } from 'react';

const Block = (props) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });

  return (
    <Flex
      px="4x"
      py="3x"
      alignItems="flex-start"
      justifyContent="center"
      flexDirection="column"
      backgroundColor={colorStyle.background.secondary}
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
  const outlineStyle = 'solid';
  const outlineWidths = ['thin', 'medium', 'thick'];
  const [outlineWidth, setOutlineWidth] = useState(outlineWidths[0]);
  const outlineValue = theme.outlines[outlineWidth] || outlineWidth;
  const outlineColorValue = theme.colors[outlineColor] || outlineColor;

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
          outlineStyle={outlineStyle}
        >
          <Text>outline="{outlineValue}"</Text>
          <Text>outlineColor="{outlineColorValue}"</Text>
          <Text>outlineStyle="{outlineStyle}"</Text>
        </Block>
      </Flex>
    </>
  );
};

export default App;
