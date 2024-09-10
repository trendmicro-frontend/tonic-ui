import {
  Alert,
  Badge,
  Box,
  Button,
  ButtonGroup,
  ButtonLink,
  Checkbox,
  Divider,
  Flex,
  Image,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupAppend,
  InputGroupPrepend,
  Grid,
  Link,
  MenuDivider,
  MenuItem,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SearchInput,
  Skeleton,
  Space,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Tag,
  Text,
  useColorMode,
  useColorStyle,
  usePortalManager,
} from '@tonic-ui/react';
import {
  AlertIcon,
  ArrowUpIcon,
  ChartAreaIcon,
  ChartBarIcon,
  ChartPieIcon,
  ChevronRightIcon,
  LockIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
  UndoIcon,
  UserTeamIcon,
} from '@tonic-ui/react-icons';
import { ensureString } from 'ensure-type';
import NextLink from 'next/link';
import React, { forwardRef, useCallback, useEffect } from 'react';
import InstantSearchModal from '../components/InstantSearchModal';
import SearchButton from '../components/SearchButton';
import SkeletonBlock from '../components/SkeletonBlock';
import useTrack from '../hooks/useTrack';
import CodeSandboxIcon from '../icons/CodeSandboxIcon';
import GitHubIcon from '../icons/GitHubIcon';
import { open as openInCodeSandbox } from '../sandbox/codesandbox';
import persistColorMode from '../utils/persist-color-mode';

const BASE_PATH = ensureString(process.env.TONIC_UI_REACT_DOCS_BASE_PATH);

const GITHUB_REPO_URL = 'https://github.com/trendmicro-frontend/tonic-ui';

// The TONIC_UI_REACT_DOCS_VERSION environment variable might be one of: latest, pr-<number>, or version (e.g. 0.1.0) for a tag release
const TONIC_UI_REACT_DOCS_VERSION = ensureString(process.env.TONIC_UI_REACT_DOCS_VERSION);

const DefaultPage = (props) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const codeBlockBackgroundColor = {
    light: 'white',
    dark: 'black',
  }[colorMode];
  const dividerColor = {
    dark: 'gray:70',
    light: 'gray:30',
  }[colorMode];
  const docsFontSize = 'md';
  const docsLineHeight = 'md';
  const codeBlockFontSize = 'sm';
  const codeBlockLineHeight = 'sm';

  return (
    <Box
      backgroundColor={colorStyle.background.primary}
      color={colorStyle.color.primary}
      fontSize={docsFontSize}
      lineHeight={docsLineHeight}
      height="100vh"
      {...props}
    >
      <DefaultPageHeader />
      <Box
        maxWidth={{
          lg: '1024px',
          xl: '1280px',
          '2xl': '1680px',
        }}
        pt="20x"
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
                fontWeight="semibold"
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
                <NextLink href={'/getting-started'} legacyBehavior passHref>
                  <ButtonLink
                    data-track={`ClickThrough|click_get_started_link|/getting-started`}
                    variant="primary"
                    fontSize="lg"
                    lineHeight="lg"
                    px="4x"
                    py="3x"
                    textDecoration="none"
                  >
                    Get Started
                    <Space width="2x" />
                    <ChevronRightIcon />
                  </ButtonLink>
                </NextLink>
                <NextLink href={GITHUB_REPO_URL} legacyBehavior passHref>
                  <ButtonLink
                    target="_blank"
                    data-track={`ClickThrough|click_github_repo_url|${GITHUB_REPO_URL}`}
                    variant="secondary"
                    fontSize="lg"
                    lineHeight="lg"
                    px="4x"
                    py="3x"
                    textDecoration="none"
                  >
                    <GitHubIcon size="6x" />
                    <Space width="2x" />
                    <Text>GitHub</Text>
                  </ButtonLink>
                </NextLink>
              </Grid>
            </Box>
          </Box>
          <Box
            flex="1"
            p="6x"
            backgroundColor={codeBlockBackgroundColor}
            boxShadow={colorStyle.shadow.thick}
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
                <Flex
                  alignItems="center"
                  columnGap="6x"
                >
                  <Badge variant="dot" isInvisible>
                    <AlertIcon />
                  </Badge>
                  <Badge variant="dot">
                    <AlertIcon />
                  </Badge>
                  <Badge variant="dot" width="3x" height="3x">
                    <AlertIcon />
                  </Badge>
                  <Badge badgeContent="99+">
                    <AlertIcon />
                  </Badge>
                  <Badge
                    badgeContent={<Text fontFamily="mono" fontSize="xs">!</Text>}
                  >
                    <AlertIcon />
                  </Badge>
                  <Badge badgeContent="99+">
                    <Skeleton variant="rectangle" borderRadius="sm" width="8x" height="8x" />
                  </Badge>
                  <Badge
                    badgeContent={<Text fontFamily="mono" fontSize="xs">!</Text>}
                  >
                    <Skeleton variant="rectangle" borderRadius="sm" width="8x" height="8x" />
                  </Badge>
                </Flex>
                <Box>
                  <Box display="inline-flex" alignItems="center" columnGap="4x">
                    <Flex columnGap="2x">
                      <Checkbox defaultChecked={false} />
                      <Checkbox defaultChecked={true} />
                    </Flex>
                    <Flex columnGap="2x">
                      <Switch size="sm" defaultChecked={false} />
                      <Switch size="sm" defaultChecked={true} />
                    </Flex>
                    <Flex columnGap="2x">
                      <Tag variant="solid">Solid Tag</Tag>
                      <Tag variant="outline">Outline Tag</Tag>
                    </Flex>
                  </Box>
                </Box>
                <Box>
                  <Box display="inline-flex" alignItems="center" columnGap="4x">
                    <Flex columnGap="2x">
                      <Button variant="primary">Primary</Button>
                      <Button variant="secondary">Secondary</Button>
                    </Flex>
                    <ButtonGroup>
                      <Button>
                        <ChartAreaIcon />
                      </Button>
                      <Divider orientation="vertical" color={dividerColor} />
                      <Button>
                        <ChartBarIcon />
                      </Button>
                      <Divider orientation="vertical" color={dividerColor} />
                      <Button>
                        <ChartPieIcon />
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
                    <SkeletonBlock />
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
                  <SettingsIcon mr="2x" />
                  <Text>General</Text>
                </MenuItem>
                <MenuItem value="accounts">
                  <UserTeamIcon mr="2x" />
                  <Text>Accounts</Text>
                </MenuItem>
                <MenuItem value="privacy">
                  <LockIcon mr="2x" />
                <Text>Privacy</Text>
                </MenuItem>
                <MenuDivider />
                <MenuItem disabled value="restore-defaults">
                  <UndoIcon mr="2x" />
                  <Text>Restore Defaults</Text>
                </MenuItem>
              </Round>
              <Round>
                <Table variant="default" pb="3x">
                  <TableHeader>
                    <TableRow>
                      <TableCell width="240px">
                        <Box display="inline-flex" alignItems="center">
                          Name
                          <Space width="2x" />
                          <ArrowUpIcon size="3x" />
                        </Box>
                      </TableCell>
                      <TableCell width="136px" textAlign="right">Size</TableCell>
                    </TableRow>
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

const DefaultPageHeader = forwardRef((props, ref) => {
  const portal = usePortalManager();
  const [colorMode, toggleColorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const logo = {
    light: 'tonic-logo-light.svg',
    dark: 'tonic-logo-dark.svg',
  }[colorMode];
  const boxShadowColor = {
    light: 'rgba(0, 0, 0, 0.12)',
    dark: 'rgba(255, 255, 255, 0.12)',
  }[colorMode];
  const track = useTrack();

  const openInstantSearchModal = useCallback(() => {
    portal((close) => {
      const onClose = () => {
        track('InstantSearch', 'close_instant_search_modal');

        // close the modal
        close();
      };

      return (
        <InstantSearchModal onClose={onClose} />
      );
    });
  }, [portal, track]);

  const handleClickOpenInCodeSandbox = () => {
    openInCodeSandbox({
      title: 'Tonic UI',
    });
  };

  useEffect(() => {
    persistColorMode(colorMode);
  }, [colorMode]);

  return (
    <Box
      as="header"
      ref={ref}
      position="fixed"
      top={0}
      zIndex="fixed"
      height="12x"
      width="100%"
      backdropFilter="blur(20px)"
      backgroundColor={colorStyle.background.primary}
      boxShadow={`0px -1px 1px inset ${boxShadowColor}`}
      transition="all 0.2s"
      {...props}
    >
      <Box
        display="flex"
        position="relative"
        height="100%"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <NextLink href={`/`} legacyBehavior passHref>
            <Link
              data-track="Header|click_landing_page"
              background="transparent"
              color={colorStyle.color.primary}
              fontSize="xl"
              lineHeight="lg"
              outline="none"
              px="4x"
              py="2x"
              textDecoration="none"
              _active={{
                color: colorStyle.color.emphasis,
              }}
              _hover={{
                color: colorStyle.color.emphasis,
              }}
              _visited={{
                color: colorStyle.color.primary,
              }}
            >
              <Flex alignItems="center" columnGap="2x">
                <Image
                  alt=""
                  src={`${BASE_PATH}/images/${logo}`}
                  height="8x"
                />
                <Text>Tonic UI</Text>
                <sup>{TONIC_UI_REACT_DOCS_VERSION}</sup>
              </Flex>
            </Link>
          </NextLink>
        </Box>
        <Box
          display="flex"
          flex="none"
          width="auto"
          alignItems="center"
          columnGap="4x"
          px="4x"
        >
          <SearchButton
            data-track="Header|open_instant_search_modal"
            onClick={openInstantSearchModal}
          >
            Search...
          </SearchButton>
          <Box
            data-track={`Header|click_codesandbox`}
            as="a"
            color={colorStyle.color.secondary}
            _hover={{
              color: colorStyle.color.primary,
              cursor: 'pointer',
            }}
            onClick={() => handleClickOpenInCodeSandbox()}
            display="inline-flex"
            textDecoration="none"
            title="Open in CodeSandbox"
          >
            <CodeSandboxIcon size={24} />
          </Box>
          <Box
            data-track={`Header|click_toggle_color_mode|${colorMode === 'light' ? 'dark' : 'light'}`}
            as="a"
            color={colorStyle.color.secondary}
            _hover={{
              color: colorStyle.color.primary,
              cursor: 'pointer',
            }}
            onClick={() => toggleColorMode()}
            display="inline-flex"
            textDecoration="none"
            title="Toggle color mode"
          >
            {colorMode === 'light' && (
              <MoonIcon size="6x" />
            )}
            {colorMode === 'dark' && (
              <SunIcon size="6x" />
            )}
          </Box>
          <Box
            data-track={`Header|click_github_repo_url|${GITHUB_REPO_URL}`}
            as="a"
            href={GITHUB_REPO_URL}
            color={colorStyle.color.secondary}
            _hover={{
              color: colorStyle.color.primary,
              cursor: 'pointer',
            }}
            _visited={{
              color: colorStyle.color.secondary,
            }}
            display="inline-flex"
            textDecoration="none"
            title="GitHub repository"
          >
            <GitHubIcon size="6x" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
});
DefaultPageHeader.displayName = 'DefaultPageHeader';

const Round = (props) => {
  const [colorMode] = useColorMode();
  const borderColor = {
    dark: 'gray:60',
    light: 'gray:30',
  }[colorMode];

  return (
    <Box
      borderWidth={1}
      borderColor={borderColor}
      borderStyle="solid"
      borderRadius="md"
      height="fit-content"
      {...props}
    />
  );
};
Round.displayName = 'Round';

export default DefaultPage;
