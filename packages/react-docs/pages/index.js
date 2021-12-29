import { ensureString } from 'ensure-type';
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  Icon,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupAppend,
  InputGroupPrepend,
  Grid,
  MenuDivider,
  MenuItem,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SearchInput,
  Space,
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
import FontAwesomeIcon from '../components/FontAwesomeIcon';
import Header from '../components/Header';
import SkeletonBody from '../components/SkeletonBody';

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

const DefaultPage = (props) => {
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
  const docsFontSize = 'md';
  const docsLineHeight = 'md';
  const codeBlockFontSize = 'sm';
  const codeBlockLineHeight = 'sm';

  return (
    <Box
      backgroundColor={backgroundColor}
      color={fontColor}
      fontSize={docsFontSize}
      lineHeight={docsLineHeight}
      {...props}
    >
      <Header />
      <Box
        maxWidth={{
          lg: '1024px',
          xl: '1280px',
          '2xl': '1680px',
        }}
        mt="20x"
        px="6x"
        mx="auto"
      >
        <Box
          display="flex"
          flexDirection={{
            _: 'column',
            xl: 'row', // 1024px
          }}
          gap="8x"
          alignItems="center"
        >
          <Box flex="1">
            <Box
              mb="5x"
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
            >
              <Text
                color={colorStyle.color.tertiary}
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
                <NextLink href={`${ASSET_PREFIX}/getting-started`} passHref>
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
            flex="1"
            p="6x"
            backgroundColor="black"
            width="100%"
            fontSize={codeBlockFontSize}
            lineHeight={codeBlockLineHeight}
          >
            <Grid
              templateColumns={{
                sm: '1fr', // 320px
                md: '1fr', // 640px
                lg: '1fr', // 1024px
                xl: '1fr 1fr', // 1280px
              }}
              gap="6x"
            >
              <Box
                display="flex"
                flexDirection="column"
                rowGap="6x"
                whiteSpace="nowrap"
              >
                <Box>
                  <Tabs variant="enclosed">
                    <TabList>
                      <Tab>
                        Tonic UI
                      </Tab>
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
                <Box>
                  <Box display="inline-flex" alignItems="center" columnGap="4x">
                    <Checkbox defaultChecked={false} />
                    <Checkbox defaultChecked={true} />
                    <Switch size="sm" defaultChecked={false} />
                    <Switch size="sm" defaultChecked={true} />
                    <Tag variant="solid">Solid Tag</Tag>
                    <Tag variant="outline">Outline Tag</Tag>
                  </Box>
                </Box>
                <Box>
                  <Box display="inline-flex" alignItems="center" columnGap="4x">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
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
                  <InputGroup>
                    <InputGroupPrepend>
                      <InputGroupAddon variant="filled">@</InputGroupAddon>
                    </InputGroupPrepend>
                    <Input placeholder="Username" />
                  </InputGroup>
                </Box>
                <Box>
                  <InputGroup>
                    <InputGroupPrepend>
                      <InputGroupAddon variant="filled">$</InputGroupAddon>
                    </InputGroupPrepend>
                    <Input />
                    <InputGroupAppend>
                      <InputGroupAddon variant="filled">.00</InputGroupAddon>
                    </InputGroupAppend>
                  </InputGroup>
                </Box>
                <Box>
                  <SearchInput placeholder="Search" />
                </Box>
              </Box>
              <Box>
                <ModalContent height="100%">
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

export default DefaultPage;
