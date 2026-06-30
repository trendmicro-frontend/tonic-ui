import {
  Box,
  Flex,
  Tab,
  TabList,
  Tabs,
  Text,
} from '@tonic-ui/react';

const MyTabGroup = (props) => {
  return (
    <TabList
      position="relative"
      __after={{
        content: '""',
        borderBottom: 1,
        borderBottomColor: 'border.tertiary',
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
  return (
    <Flex flexDirection="column" rowGap="4x">
      <Box>
        <Text fontSize="lg" lineHeight="lg" mb="2x">
          Left-aligned
        </Text>
        <Box p="4x">
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
        <Box p="4x">
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
        <Box p="4x">
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
        <Box p="4x">
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
        <Box p="4x">
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
