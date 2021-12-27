import { ensureString } from 'ensure-type';
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Divider,
  Icon,
  Grid,
  Link,
  Menu,
  MenuDivider,
  MenuItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  Space,
  Stack,
  Switch,
  Tab,
  Tabs,
  TabList,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableHeaderRow,
  TableRow,
  Tag,
  Text,
  useColorMode,
  useColorStyle,
} from '@tonic-ui/react';
import NextLink from 'next/link';
import React from 'react';
import Header from '../components/Header';
import FontAwesomeIcon from './FontAwesomeIcon';
import SkeletonBody from './SkeletonBody';

const ASSET_PREFIX = ensureString(process.env.ASSET_PREFIX);

const GITHUB_URL = 'https://github.com/trendmicro-frontend/tonic-ui';

const Round = (props) => {
  return (
    <Box
      borderWidth={1}
      borderColor="gray:80"
      borderStyle="solid"
      borderRadius="lg"
      height="fit-content"
      {...props}
    />
  );
};

const MainPage = (props) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const backgroundColor = {
    light: 'white',
    dark: 'gray:100',
  }[colorMode];
  const dividerColor = {
    dark: 'gray:70',
    light: 'gray:30',
  }[colorMode];
  const fontColor = {
    light: 'black:primary',
    dark: 'white:primary',
  }[colorMode];

  return (
    <Box
      backgroundColor={backgroundColor}
      color={fontColor}
      fontSize="sm"
      lineHeight="sm"
      {...props}
    >
      <Header />
      <Box
        maxWidth={{
          lg: '1024px',
          xl: '1280px',
          '2xl': '1680px',
        }}
        height="calc(100vh - 120px)"
        minHeight={500}
        mt="12x"
        pl="5x"
        mx="auto"
      >
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="nowrap"
          width="100%"
          height="100%"
          alignItems="center"
        >
          <Box
            flexBasis="50%"
            flexGrow="0"
            maxWidth="50%"
          >
            <Box
              mb="5x"
              maxWidth={600}
            >
              <Text
                fontSize="4rem"
                fontWeight="800"
                lineHeight="1.25"
              >
                Start building with Tonic UI today!
              </Text>
            </Box>
            <Box
              mb="5x"
              maxWidth={600}
            >
              <Text
                color={colorStyle.color.tertiary}
                fontSize="md"
                lineHeight="md"
              >
                Tonic UI is a UI component library for React, built with Emotion and Styled System. It is designed to be easy to use and easy to customize.
              </Text>
            </Box>
            <Box
              display="inline-flex"
            >
              <Grid
                templateColumns="1fr 1fr"
                gap="4x"
              >
                <NextLink href={`${ASSET_PREFIX}/usage`} passHref>
                  <Button
                    as="a"
                    textDecoration="none"
                    variant="primary"
                    fontSize="lg"
                    lineHeight="lg"
                    px="4x"
                    py="3x"
                  >
                    Get Started
                    <Space width="2x" />
                    <Icon icon="chevron-right" />
                  </Button>
                </NextLink>
                <NextLink href={GITHUB_URL} passHref>
                  <Button
                    as="a"
                    textDecoration="none"
                    variant="secondary"
                    fontSize="lg"
                    lineHeight="lg"
                    px="4x"
                    py="3x"
                  >
                    <FontAwesomeIcon
                      icon={['fab', 'github']}
                      style={{
                        width: 24,
                        height: 24,
                      }}
                    />
                    <Space width="2x" />
                    <Text>GitHub</Text>
                  </Button>
                </NextLink>
              </Grid>
            </Box>
          </Box>
          <Box
            flexBasis="50%"
            flexGrow="0"
            maxWidth="50%"
            p="6x"
            backgroundColor="black"
          >
            <Grid
              templateColumns="1fr 1fr"
              gap="6x"
            >
              <Box>
                <Box mb="6x">
                  <Tabs variant="enclosed">
                    <TabList>
                      <Tab>
                        React
                      </Tab>
                      <Tab>
                        Styled System
                      </Tab>
                      <Tab>
                        CSS-in-JS
                      </Tab>
                    </TabList>
                  </Tabs>
                </Box>
                <Box mb="6x">
                  <Box display="inline-flex" alignItems="center">
                    <Switch size="sm" defaultChecked={true} />
                    <Space width="2x" />
                    <Switch size="sm" defaultChecked={false} />
                    <Space width="2x" />
                    <Tag variant="solid">Solid Tag</Tag>
                    <Space width="2x" />
                    <Tag variant="outline">Outline Tag</Tag>
                  </Box>
                </Box>
                <Box mb="6x">
                  <Button variant="primary">Primary Button</Button>
                  <Space width="2x" />
                  <Button variant="secondary">Secondary Button</Button>
                </Box>
                <Box mb="6x">
                  <ButtonGroup>
                    <Button>
                      <Icon icon="chart-area" />
                    </Button>
                    <Divider orientation="vertical" color={dividerColor} />
                    <Button>
                      <Icon icon="chart-bar" />
                    </Button>
                    <Divider orientation="vertical" color={dividerColor} />
                    <Button>
                      <Icon icon="chart-pie" />
                    </Button>
                  </ButtonGroup>
                </Box>
              </Box>
              <Box>
                <ModalContent>
                  <ModalHeader>
                    Modal Title
                  </ModalHeader>
                  <ModalBody>
                    <Alert variant="outline" severity="warning" mb="4x">
                      <Text>This is a warning alert</Text>
                    </Alert>
                    <Text mb="4x">
                      Modal body text goes here.
                    </Text>
                    <SkeletonBody />
                  </ModalBody>
                  <ModalFooter>
                    <Button variant="primary" minWidth="20x">Save Changes</Button>
                    <Space width="2x" />
                    <Button minWidth="20x">Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Box>
              <Round p="3x">
                <MenuItem value="general">
                  <Icon icon="settings" mr="2x" />
                  <Text>General</Text>
                </MenuItem>
                <MenuItem value="accounts">
                  <Icon icon="user-team" mr="2x" />
                  <Text>Accounts</Text>
                </MenuItem>
                <MenuItem value="privacy">
                  <Icon icon="lock" mr="2x" />
                <Text>Privacy</Text>
                </MenuItem>
                <MenuDivider />
                <MenuItem disabled value="restore-defaults">
                  <Icon icon="undo" mr="2x" />
                  <Text>Restore Defaults</Text>
                </MenuItem>
              </Round>
              <Round>
                <Table variant="default" pb="3x">
                  <TableHeader>
                    <TableHeaderRow>
                      <TableHeaderCell width="240px">
                        <Box display="inline-flex" alignItems="center">
                          Name
                          <Space width="2x" />
                          <Icon icon="arrow-up" size="3x" />
                        </Box>
                      </TableHeaderCell>
                      <TableHeaderCell width="136px" textAlign="right">Size</TableHeaderCell>
                    </TableHeaderRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell width="240px">assets</TableCell>
                      <TableCell width="136px" textAlign="right">11 MB</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell width="240px">build</TableCell>
                      <TableCell width="136px" textAlign="right">20 MB</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell width="240px">src</TableCell>
                      <TableCell width="136px" textAlign="right">2 MB</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell width="240px">test</TableCell>
                      <TableCell width="136px" textAlign="right">125.4 KB</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Round>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MainPage;
