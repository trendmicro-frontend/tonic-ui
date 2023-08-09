import {
  Box,
  Flex,
  Tab,
  TabList,
  Tabs,
  Text,
  useColorMode,
  useColorStyle,
} from '@tonic-ui/react';
import React from 'react';

const MyTabGroup = (props) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  return (
    <TabList
      position="relative"
      __after={{
        content: '""',
        borderBottom: 1,
        borderBottomColor: colorStyle.divider,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        ...props.__after,
      }}
      {...props}
    />
  );
};

const App = () => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });

  return (
    <Flex flexDirection="column" rowGap="4x">
      <Box>
        <Text fontSize="lg" lineHeight="lg" mb="2x">
          Left-aligned
        </Text>
        <Box backgroundColor={colorStyle.background.secondary} p="4x">
          <Tabs>
            <MyTabGroup justifyContent="flex-start">
              <Tab>TAB 1</Tab>
              <Tab>TAB 2</Tab>
              <Tab>TAB 3</Tab>
            </MyTabGroup>
          </Tabs>
        </Box>
      </Box>
      <Box>
        <Text fontSize="lg" lineHeight="lg" mb="2x">
          Centered
        </Text>
        <Box backgroundColor={colorStyle.background.secondary} p="4x">
          <Tabs>
            <MyTabGroup justifyContent="center">
              <Tab>TAB 1</Tab>
              <Tab>TAB 2</Tab>
              <Tab>TAB 3</Tab>
            </MyTabGroup>
          </Tabs>
        </Box>
      </Box>
      <Box>
        <Text fontSize="lg" lineHeight="lg" mb="2x">
          Right-aligned
        </Text>
        <Box backgroundColor={colorStyle.background.secondary} p="4x">
          <Tabs>
            <MyTabGroup justifyContent="flex-end">
              <Tab>TAB 1</Tab>
              <Tab>TAB 2</Tab>
              <Tab>TAB 3</Tab>
            </MyTabGroup>
          </Tabs>
        </Box>
      </Box>
      <Box>
        <Text fontSize="lg" lineHeight="lg" mb="2x">
          Full width
        </Text>
        <Box backgroundColor={colorStyle.background.secondary} p="4x">
          <Tabs>
            <MyTabGroup>
              <Tab width="100%">TAB 1</Tab>
              <Tab width="100%">TAB 2</Tab>
              <Tab width="100%">TAB 3</Tab>
            </MyTabGroup>
          </Tabs>
        </Box>
      </Box>
      <Box>
        <Text fontSize="lg" lineHeight="lg" mb="2x">
          Auto-sizing
        </Text>
        <Box backgroundColor={colorStyle.background.secondary} p="4x">
          <Tabs>
            <MyTabGroup display="inline-flex">
              <Tab>TAB 1</Tab>
              <Tab>TAB 2</Tab>
              <Tab>TAB 3</Tab>
            </MyTabGroup>
          </Tabs>
        </Box>
      </Box>
    </Flex>
  );
};

export default App;
