import { Global, css } from '@emotion/react';
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Grid,
  Input,
  Space,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Text,
  TextLabel,
  Tooltip,
  useColorMode,
  useColorStyle,
} from '@tonic-ui/react';
import { EmailIcon, UserIcon } from '@tonic-ui/react-icons';
import {
  useToggle,
} from '@tonic-ui/react-hooks';
import React, { useRef, useState } from 'react';
import SkeletonBlock from '@/components/SkeletonBlock';

const CodeBlock = (props) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });

  return (
    <Box
      backgroundColor={colorStyle.background.secondary}
      border={1}
      borderColor={colorStyle.divider}
      fontFamily="mono"
      py="3x"
      px="3x"
      whiteSpace="pre"
      {...props}
    />
  );
};

const FormGroup = (props) => (
  <Box mb="4x" {...props} />
);

const useSelection = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  const changeBy = (value) => () => setValue(value);
  return [value, changeBy];
};

const bodyScrollLockCode = `
// import
import { Global } from '@emotion/react';

// example
<Drawer>
  <Global
    styles={css\`
      body {
        overflow: hidden;
      }
    \`}
  />
  <DrawerOverlay />
  <DrawerContent>
    <DrawerHeader />
    <DrawerBody />
    <DrawerFooter />
  </DrawerContent>
</Drawer>
`.trim();

const App = () => {
  const initialFocusRef = useRef();
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const iconColor = colorStyle.color.tertiary;
  const [isOpen, toggleDrawer] = useToggle(false);
  const [placement, changePlacementBy] = useSelection('right');
  const [size, changeSizeBy] = useSelection('auto');
  const [autoFocus, toggleAutoFocus] = useToggle(true);
  const [backdrop, toggleBackdrop] = useToggle(true);
  const [closeOnEsc, toggleCloseOnEsc] = useToggle(true);
  const [closeOnOutsideClick, toggleCloseOnOutsideClick] = useToggle(true);
  const [ensureFocus, toggleEnsureFocus] = useToggle(true);
  const [isClosable, toggleIsClosable] = useToggle(true);
  const [returnFocusOnClose, toggleReturnFocusOnClose] = useToggle(true);
  const [isOverlayVisible, toggleIsOverlayVisible] = useToggle(true);
  const [isHeaderVisible, toggleIsHeaderVisible] = useToggle(true);
  const [isBodyVisible, toggleIsBodyVisible] = useToggle(true);
  const [isFooterVisible, toggleIsFooterVisible] = useToggle(true);
  const [isAlertVisible, toggleIsAlertVisible] = useToggle(true);
  const [enableBodyScrollLock, toggleBodyScrollLock] = useToggle(true);

  return (<>
    <Box>
      <Tooltip label="Click to launch drawer" openOnFocus={false}>
        <Button onClick={() => toggleDrawer(true)}>
          Launch drawer
        </Button>
      </Tooltip>
    </Box>
    <Divider my="4x" />
    <Box mb="4x">
      <Text fontSize="lg" lineHeight="lg">
        Drawer props
      </Text>
    </Box>
    <FormGroup>
      <Box mb="2x">
        <TextLabel>
          placement
        </TextLabel>
      </Box>
      <ButtonGroup
        variant="secondary"
        sx={{
          '> *:not(:first-of-type)': {
            marginLeft: -1
          }
        }}
      >
        {['left', 'right', 'top', 'bottom'].map(value => (
          <Button
            key={value}
            selected={value === placement} 
            onClick={changePlacementBy(value)}
            minWidth="15x"
          >
            {value}
          </Button>
        ))}
      </ButtonGroup>
    </FormGroup>
    <FormGroup>
      <Box mb="2x">
        <TextLabel>
          size
        </TextLabel>
      </Box>
      <ButtonGroup
        variant="secondary"
        sx={{
          '> *:not(:first-of-type)': {
            marginLeft: -1
          }
        }}
      >
        {['auto', 'sm', 'md', 'lg', 'full'].map(value => (
          <Button
            key={value}
            selected={value === size}
            onClick={changeSizeBy(value)}
            minWidth="15x"
          >
            {value}
          </Button>
        ))}
      </ButtonGroup>
    </FormGroup>
    <FormGroup>
      <TextLabel display="flex" alignItems="center">
        <Checkbox
          checked={autoFocus}
          disabled={!ensureFocus}
          onChange={() => toggleAutoFocus()}
        />
        <Space width="2x" />
        <Text fontFamily="mono" whiteSpace="nowrap">autoFocus</Text>
      </TextLabel>
    </FormGroup>
    <FormGroup>
      <TextLabel display="flex" alignItems="center">
        <Checkbox
          checked={backdrop}
          onChange={(e) => {
            const nextBackdrop = !backdrop;
            if (!nextBackdrop) {
              toggleCloseOnOutsideClick(false);
              toggleIsOverlayVisible(false);
            }

            toggleBackdrop();
          }}
        />
        <Space width="2x" />
        <Text fontFamily="mono" whiteSpace="nowrap">backdrop</Text>
      </TextLabel>
    </FormGroup>
    <FormGroup>
      <TextLabel display="flex" alignItems="center">
        <Checkbox
          checked={closeOnEsc}
          disabled={!isClosable && !closeOnOutsideClick}
          onChange={() => toggleCloseOnEsc()}
        />
        <Space width="2x" />
        <Text fontFamily="mono" whiteSpace="nowrap">closeOnEsc</Text>
      </TextLabel>
    </FormGroup>
    <FormGroup>
      <TextLabel display="flex" alignItems="center">
        <Checkbox
          checked={closeOnOutsideClick}
          disabled={(!isClosable && !closeOnEsc) || !backdrop}
          onChange={() => toggleCloseOnOutsideClick()}
        />
        <Space width="2x" />
        <Text fontFamily="mono" whiteSpace="nowrap">closeOnOutsideClick</Text>
      </TextLabel>
    </FormGroup>
    <FormGroup>
      <TextLabel display="flex" alignItems="center">
        <Checkbox
          checked={ensureFocus}
          onChange={() => toggleEnsureFocus()}
        />
        <Space width="2x" />
        <Text fontFamily="mono" whiteSpace="nowrap">ensureFocus</Text>
      </TextLabel>
    </FormGroup>
    <FormGroup>
      <TextLabel display="flex" alignItems="center">
        <Checkbox
          checked={isClosable}
          disabled={!closeOnEsc && !closeOnOutsideClick}
          onChange={() => toggleIsClosable()}
        />
        <Space width="2x" />
        <Text fontFamily="mono" whiteSpace="nowrap">isClosable</Text>
      </TextLabel>
    </FormGroup>
    <FormGroup>
      <TextLabel display="flex" alignItems="center">
        <Checkbox
          checked={returnFocusOnClose}
          disabled={!ensureFocus}
          onChange={() => toggleReturnFocusOnClose()}
        />
        <Space width="2x" />
        <Text fontFamily="mono" whiteSpace="nowrap">returnFocusOnClose</Text>
      </TextLabel>
    </FormGroup>
    <Divider my="4x" />
    <Box mb="4x">
      <Text fontSize="lg" lineHeight="lg">
        Drawer composition
      </Text>
    </Box>
    <FormGroup>
      <TextLabel display="flex" alignItems="center">
        <Checkbox
          checked={isOverlayVisible}
          disabled={!backdrop}
          onChange={() => toggleIsOverlayVisible()}
        />
        <Space width="2x" />
        <Text fontFamily="mono" whiteSpace="nowrap">DrawerOverlay</Text>
      </TextLabel>
    </FormGroup>
    <FormGroup>
      <TextLabel display="flex" alignItems="center">
        <Checkbox checked={isHeaderVisible} onChange={() => toggleIsHeaderVisible()} />
        <Space width="2x" />
        <Text fontFamily="mono" whiteSpace="nowrap">DrawerHeader</Text>
      </TextLabel>
    </FormGroup>
    <FormGroup>
      <TextLabel display="flex" alignItems="center">
        <Checkbox checked={isBodyVisible} onChange={() => toggleIsBodyVisible()} />
        <Space width="2x" />
        <Text fontFamily="mono" whiteSpace="nowrap">DrawerBody</Text>
      </TextLabel>
    </FormGroup>
    <FormGroup>
      <TextLabel display="flex" alignItems="center">
        <Checkbox checked={isFooterVisible} onChange={() => toggleIsFooterVisible()} />
        <Space width="2x" />
        <Text fontFamily="mono" whiteSpace="nowrap">DrawerFooter</Text>
      </TextLabel>
    </FormGroup>
    <Divider my="4x" />
    <Box mb="4x">
      <Text fontSize="lg" lineHeight="lg">
        Extra drawer setup
      </Text>
    </Box>
    <FormGroup>
      <TextLabel display="flex" alignItems="center" mb="3x">
        <Checkbox
          checked={enableBodyScrollLock}
          onChange={() => toggleBodyScrollLock()}
        />
        <Space width="2x" />
        <Text>
          Enable body scroll locking
        </Text>
      </TextLabel>
      <Box ml="6x">
        <Box mb="4x">
          <Text mb="2x">
            You can use <strong>Body Scroll Locking</strong> to prevent the user from scrolling the page while the drawer is open.
          </Text>
          <Text mb="2x">
            <strong>Body Scroll Locking</strong> is currently not available with default setup, you can follow the instructions below to append global styles to the body to prevent scrolling.
          </Text>
        </Box>
        <CodeBlock>
          {bodyScrollLockCode}
        </CodeBlock>
      </Box>
    </FormGroup>
    <Drawer
      autoFocus={autoFocus}
      backdrop={backdrop}
      closeOnEsc={closeOnEsc}
      closeOnOutsideClick={closeOnOutsideClick}
      ensureFocus={ensureFocus}
      initialFocusRef={initialFocusRef}
      isClosable={isClosable}
      isOpen={isOpen}
      onClose={() => toggleDrawer(false)}
      placement={placement}
      returnFocusOnClose={returnFocusOnClose}
      size={size}
    >
      {enableBodyScrollLock && (
        <Global
          styles={css`
            body {
              overflow: hidden;
            }
          `}
        />
      )}
      {isOverlayVisible && (
        <DrawerOverlay />
      )}
      <DrawerContent>
        {isHeaderVisible && (
          <DrawerHeader>
            {size === 'auto' && <Text>Auto-sized Drawer</Text>}
            {size === 'sm' && <Text>Small Drawer</Text>}
            {size === 'md' && <Text>Medium Drawer</Text>}
            {size === 'lg' && <Text>Large Drawer</Text>}
            {size === 'full' && <Text>Full-width Drawer</Text>}
          </DrawerHeader>
        )}
        {isBodyVisible && (
          <DrawerBody>
            {isAlertVisible && (
              <Alert variant="outline" severity="info" mb="4x" isClosable onClose={() => toggleIsAlertVisible()}>
                <Text>This is an info alert</Text>
              </Alert>
            )}
            <Tabs>
              <TabList mb="4x">
                <Tab>Tab 1</Tab>
                <Tab>Tab 2</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <SkeletonBlock mb="4x" />
                  <Grid
                    templateColumns="auto 1fr"
                    rowGap="2x"
                    columnGap="3x"
                    alignItems="center"
                    mb="4x"
                  >
                    <UserIcon color={iconColor} />
                    <Input ref={initialFocusRef} placeholder="User name" />
                    <EmailIcon color={iconColor} />
                    <Input placeholder="Email address" />
                  </Grid>
                </TabPanel>
                <TabPanel>
                  <Box
                    backgroundColor={colorStyle.background.tertiary}
                    minHeight={1000}
                    px="3x"
                    py="2x"
                  >
                    <Text>
                      This is a very long content that will overflow the drawer
                    </Text>
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </DrawerBody>
        )}
        {isFooterVisible && (
          <DrawerFooter>
            <Grid
              templateColumns="1fr 1fr"
              columnGap="2x"
            >
              <Button variant="primary" onClick={() => toggleDrawer(false)}>
                OK
              </Button>
              <Button onClick={() => toggleDrawer(false)}>
                Cancel
              </Button>
            </Grid>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  </>);
};

export default App;
