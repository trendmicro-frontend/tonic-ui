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
  const borderStyle = 'solid';
  const borderWidths = ['thin', 'medium', 'thick'];
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
          borderStyle={borderStyle}
        >
          <Text>border="{borderValue}"</Text>
          <Text>borderColor="{borderColorValue}"</Text>
          <Text>borderStyle="{borderStyle}"</Text>
        </Block>
        <Block
          borderTop={borderWidth}
          borderTopColor={borderColor}
          borderTopStyle={borderStyle}
        >
          <Text>borderTop="{borderValue}"</Text>
          <Text>borderTopColor="{borderColorValue}"</Text>
          <Text>borderTopStyle="{borderStyle}"</Text>
        </Block>
        <Block
          borderRight={borderWidth}
          borderRightColor={borderColor}
          borderRightStyle={borderStyle}
        >
          <Text>borderRight="{borderValue}"</Text>
          <Text>borderRightColor="{borderColorValue}"</Text>
          <Text>borderRightStyle="{borderStyle}"</Text>
        </Block>
        <Block
          borderBottom={borderWidth}
          borderBottomColor={borderColor}
          borderBottomStyle={borderStyle}
        >
          <Text>borderBottom="{borderValue}"</Text>
          <Text>borderBottomColor="{borderColorValue}"</Text>
          <Text>borderBottomStyle="{borderStyle}"</Text>
        </Block>
        <Block
          borderLeft={borderWidth}
          borderLeftColor={borderColor}
          borderLeftStyle={borderStyle}
        >
          <Text>borderLeft="{borderValue}"</Text>
          <Text>borderLeftColor="{borderColorValue}"</Text>
          <Text>borderLeftStyle="{borderStyle}"</Text>
        </Block>
      </Grid>
    </>
  );
};

export default App;
