import { Global, css } from '@emotion/react';
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Code,
  Divider,
  Flex,
  Grid,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
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
import { EmailIcon, InfoOIcon, UserIcon } from '@tonic-ui/react-icons';
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
<Modal>
  <Global
    styles={css\`
      body {
        overflow: hidden;
      }
    \`}
  />
  <ModalOverlay />
  <ModalContent>
    <ModalHeader />
    <ModalBody />
    <ModalFooter />
  </ModalContent>
</Modal>
`.trim();

const App = () => {
  const initialFocusRef = useRef();
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const iconColor = colorStyle.color.tertiary;
  const [isOpen, toggleModal] = useToggle(false);
  const [size, changeSizeBy] = useSelection('auto');
  const [scrollBehavior, changeScrollBehaviorBy] = useSelection('inside');
  const [initialContentHeight, changeInitialContentHeightBy] = useSelection('default');
  const [verticalPadding, changeVerticalPaddingBy] = useSelection('default');
  const [autoFocus, toggleAutoFocus] = useToggle(true);
  const [closeOnEsc, toggleCloseOnEsc] = useToggle(true);
  const [closeOnOutsideClick, toggleCloseOnOutsideClick] = useToggle(true);
  const [ensureFocus, toggleEnsureFocus] = useToggle(true);
  const [isClosable, toggleIsCloseButtonVisible] = useToggle(true);
  const [returnFocusOnClose, toggleReturnFocusOnClose] = useToggle(true);
  const [isOverlayVisible, toggleIsOverlayVisible] = useToggle(true);
  const [isHeaderVisible, toggleIsHeaderVisible] = useToggle(true);
  const [isBodyVisible, toggleIsBodyVisible] = useToggle(true);
  const [isFooterVisible, toggleIsFooterVisible] = useToggle(true);
  const [isAlertVisible, toggleIsAlertVisible] = useToggle(true);
  const [enableBodyScrollLock, toggleBodyScrollLock] = useToggle(true);
  const modalStyleProps = {};
  const modalContentStyleProps = {};

  if (size !== 'full') {
    if (verticalPadding !== 'default') {
      modalStyleProps.py = verticalPadding;
    }

    if (initialContentHeight !== 'default') {
      const propKey = (scrollBehavior === 'inside') ? 'height' : 'minHeight';
      modalContentStyleProps[propKey] = initialContentHeight;
    }
  }

  return (<>
    <Box>
      <Tooltip label="Click to launch modal" openOnFocus={false}>
        <Button onClick={() => toggleModal(true)}>
          Launch modal
        </Button>
      </Tooltip>
    </Box>
    <Divider my="4x" />
    <Box mb="4x">
      <Text fontSize="lg" lineHeight="lg">
        Modal props
      </Text>
    </Box>
    <FormGroup>
      <Box mb="2x">
        <Tooltip
          placement="right"
          label={(
            <>
              <Text mb="2x">
                Use the <Code>scrollBehavior</Code> prop to control how scrolling should behave:
              </Text>
              <Box as="ul" my="2x">
                <li>If set to <Code>inside</Code>, only the <Code>ModalBody</Code> will scroll.</li>
                <li>If set to <Code>outside</Code>, the entire <Code>ModalContent</Code> will scroll within the viewport.</li>
              </Box>
            </>
          )}
        >
          <TextLabel display="inline-block">
            <Flex alignItems="center" columnGap="2x">
              scrollBehavior
              <InfoOIcon />
            </Flex>
          </TextLabel>
        </Tooltip>
      </Box>
      <ButtonGroup
        variant="secondary"
        sx={{
          '> *:not(:first-of-type)': {
            marginLeft: -1
          }
        }}
      >
        {['inside', 'outside'].map(value => (
          <Button
            key={value}
            selected={value === scrollBehavior}
            onClick={changeScrollBehaviorBy(value)}
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
        {['auto', 'xs', 'sm', 'md', 'lg', 'xl', 'full'].map(value => (
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
          disabled={!isClosable && !closeOnEsc}
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
          onChange={() => toggleIsCloseButtonVisible()}
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
        Modal style props
      </Text>
    </Box>
    <FormGroup>
      <Box mb="2x">
        <TextLabel>
          Initial content height
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
        {['default', 'stretch'].map(value => (
          <Button
            disabled={size === 'full'}
            key={value}
            selected={value === initialContentHeight}
            onClick={changeInitialContentHeightBy(value)}
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
          Vertical padding
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
        {['default', '3rem'].map(value => (
          <Button
            disabled={size === 'full'}
            key={value}
            selected={value === verticalPadding}
            onClick={changeVerticalPaddingBy(value)}
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
          Pass below props to ModalContent for settings initial height and vertical margins. Note that the props are different when <Code>scrollBehavior</Code> changes.
        </TextLabel>
      </Box>
      <CodeBlock>
        {`const modalStyleProps = ${JSON.stringify(modalStyleProps, null, 2)};\nconst modalContentStyleProps = ${JSON.stringify(modalContentStyleProps, null, 2)};\n\n// example\n<Modal\n  scrollBehavior="${scrollBehavior}"\n  {...modalStyleProps}\n>\n  <ModalOverlay />\n  <ModalContent {...contentStyleProps}>\n    <ModalHeader />\n    <ModalBody />\n    <ModalFooter />\n  </ModalContent>\n</Modal>`}
      </CodeBlock>
    </FormGroup>
    <Divider my="4x" />
    <Box mb="4x">
      <Text fontSize="lg" lineHeight="lg">
        Modal composition
      </Text>
    </Box>
    <FormGroup>
      <TextLabel display="flex" alignItems="center">
        <Checkbox checked={isOverlayVisible} onChange={() => toggleIsOverlayVisible()} />
        <Space width="2x" />
        <Text fontFamily="mono" whiteSpace="nowrap">ModalOverlay</Text>
      </TextLabel>
    </FormGroup>
    <FormGroup>
      <TextLabel display="flex" alignItems="center">
        <Checkbox checked={isHeaderVisible} onChange={() => toggleIsHeaderVisible()} />
        <Space width="2x" />
        <Text fontFamily="mono" whiteSpace="nowrap">ModalHeader</Text>
      </TextLabel>
    </FormGroup>
    <FormGroup>
      <TextLabel display="flex" alignItems="center">
        <Checkbox checked={isBodyVisible} onChange={() => toggleIsBodyVisible()} />
        <Space width="2x" />
        <Text fontFamily="mono" whiteSpace="nowrap">ModalBody</Text>
      </TextLabel>
    </FormGroup>
    <FormGroup>
      <TextLabel display="flex" alignItems="center">
        <Checkbox checked={isFooterVisible} onChange={() => toggleIsFooterVisible()} />
        <Space width="2x" />
        <Text fontFamily="mono" whiteSpace="nowrap">ModalFooter</Text>
      </TextLabel>
    </FormGroup>
    <Divider my="4x" />
    <Box mb="4x">
      <Text fontSize="lg" lineHeight="lg">
        Extra modal setup
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
            When setting <Code>{'scrollBehavior="outside"'}</Code> to enable outside scrolling, you should also use <strong>Body Scroll Locking</strong> to prevent the user from scrolling the page while the modal is open.
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
    <Modal
      TransitionComponent={null}
      autoFocus={autoFocus}
      closeOnEsc={closeOnEsc}
      closeOnOutsideClick={closeOnOutsideClick}
      ensureFocus={ensureFocus}
      initialFocusRef={initialFocusRef}
      isClosable={isClosable}
      isOpen={isOpen}
      onClose={() => toggleModal(false)}
      returnFocusOnClose={returnFocusOnClose}
      scrollBehavior={scrollBehavior}
      size={size}
      {...modalStyleProps}
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
        <ModalOverlay />
      )}
      <ModalContent
        {...modalContentStyleProps}
      >
        {isHeaderVisible && (
          <ModalHeader>
            {size === 'auto' && <Text>Auto-sized Modal</Text>}
            {size === 'xs' && <Text>Extra Small Modal</Text>}
            {size === 'sm' && <Text>Small Modal</Text>}
            {size === 'md' && <Text>Medium Modal</Text>}
            {size === 'lg' && <Text>Large Modal</Text>}
            {size === 'xl' && <Text>Extra Large Modal</Text>}
            {size === 'full' && <Text>Full-width Modal</Text>}
          </ModalHeader>
        )}
        {isBodyVisible && (
          <ModalBody>
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
                      This is a very long content that will overflow the modal
                    </Text>
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        )}
        {isFooterVisible && (
          <ModalFooter>
            <Grid
              templateColumns="1fr 1fr"
              columnGap="2x"
            >
              <Button variant="primary">
                OK
              </Button>
              <Button onClick={() => toggleModal(false)}>
                Cancel
              </Button>
            </Grid>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  </>);
};

export default App;
