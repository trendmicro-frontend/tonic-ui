/* eslint-disable react/no-unescaped-entities */
import { Button, Flex, Grid, Space, Stack, Text, TextLabel, useColorMode, useColorStyle, useTheme } from '@tonic-ui/react';
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
  const borderColor = {
    dark: 'gray:60',
    light: 'gray:30',
  }[colorMode];
  const borderWidths = [1, 2, 3, 4, 5];
  const [borderWidth, setBorderWidth] = useState(borderWidths[0]);
  const borderValue = theme.borders[borderWidth] || borderWidth;
  const borderColorValue = theme.colors[borderColor] || borderColor;

  return (
    <>
      <Flex alignItems="center" mb="5x">
        <TextLabel>border =</TextLabel>
        <Space width="2x" />
        <Stack direction="row" spacing="2x">
          {borderWidths.map((width) => (
            <Button
              key={width}
              onClick={() => setBorderWidth(width)}
              variant={width === borderWidth ? 'primary' : 'secondary'}
            >
              <Text fontFamily="mono">{width}</Text>
            </Button>
          ))}
        </Stack>
      </Flex>
      <Grid
        templateColumns="repeat(auto-fill, minmax(240px, 1fr))"
        columnGap="6x"
        rowGap="6x"
      >
        <Block
          border={borderWidth}
          borderColor={borderColor}
        >
          <Text>border="{borderValue}"</Text>
          <Text>borderColor="{borderColorValue}"</Text>
        </Block>
        <Block
          borderTop={borderWidth}
          borderTopColor={borderColor}
        >
          <Text>borderTop="{borderValue}"</Text>
          <Text>borderTopColor="{borderColorValue}"</Text>
        </Block>
        <Block
          borderRight={borderWidth}
          borderRightColor={borderColor}
        >
          <Text>borderRight="{borderValue}"</Text>
          <Text>borderRightColor="{borderColorValue}"</Text>
        </Block>
        <Block
          borderBottom={borderWidth}
          borderBottomColor={borderColor}
        >
          <Text>borderBottom="{borderValue}"</Text>
          <Text>borderBottomColor="{borderColorValue}"</Text>
        </Block>
        <Block
          borderLeft={borderWidth}
          borderLeftColor={borderColor}
        >
          <Text>borderLeft="{borderValue}"</Text>
          <Text>borderLeftColor="{borderColorValue}"</Text>
        </Block>
      </Grid>
    </>
  );
};

export default App;
