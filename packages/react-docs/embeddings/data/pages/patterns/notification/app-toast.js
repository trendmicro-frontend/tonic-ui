import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Icon,
  Text,
  Toast,
  useColorMode,
  useColorStyle,
  useToastManager,
} from '@tonic-ui/react';
import React from 'react';

const MAX_TOASTS = 3;

const App = () => {
  const toast = useToastManager();

  const handleClickAddToastByAppearance = (appearance) => (event) => {
    // Remove current focus
    event.currentTarget.blur();

    const content = {
      success: (
        <>
          <Text>This is a success message.</Text>
          <Text>The toast will be automatically dismissed after 5 seconds.</Text>
        </>
      ),
      info: (
        <>
          <Text>This is an info message.</Text>
          <Text>The toast will remain visible until the user dismisses it.</Text>
        </>
      ),
      warning: (
        <>
          <Text>This is a warning message.</Text>
          <Text>The toast will remain visible until the user dismisses it.</Text>
        </>
      ),
      error: (
        <>
          <Text>This is an error message.</Text>
          <Text>The toast will remain visible until the user dismisses it.</Text>
        </>
      ),
    }[appearance];

    const placement = 'bottom-right';
    const duration = appearance === 'success' ? 5000 : undefined;
    const options = {
      placement,
      duration,
    };

    toast.notify(({ onClose, placement }) => {
      const styleProps = {
        'top-left': { pt: '2x', px: '4x' },
        'top': { pt: '2x', px: '4x' },
        'top-right': { pt: '2x', px: '4x' },
        'bottom-left': { pb: '2x', px: '4x' },
        'bottom': { pb: '2x', px: '4x' },
        'bottom-right': { pb: '2x', px: '4x' },
      }[placement];

      return (
        <Box {...styleProps}>
          <ToastLayout>
            <Toast appearance={appearance} isClosable onClose={onClose}>
              {content}
            </Toast>
          </ToastLayout>
        </Box>
      );
    }, options);

    // Limit the maximum number of toasts
    toast.setState(prevState => ({
      ...prevState,
      [placement]: prevState[placement].slice(-MAX_TOASTS),
    }));
  };

  const handleClickCloseToasts = () => {
    toast.closeAll();
  };

  return (
    <Flex
      display="inline-flex"
      flexWrap="wrap"
      columnGap="2x"
      rowGap="2x"
    >
      <ButtonGroup
        variant="secondary"
        sx={{
          flexGrow: 1,
          '> *:not(:first-of-type)': {
            marginLeft: -1
          },
          '> *': {
            columnGap: '2x',
          },
        }}
      >
        <Button onClick={handleClickAddToastByAppearance('success')}>
          <Icon icon="success" />
          Success
        </Button>
        <Button onClick={handleClickAddToastByAppearance('info')}>
          <Icon icon="info" />
          Info
        </Button>
        <Button onClick={handleClickAddToastByAppearance('warning')}>
          <Icon icon="warning-minor" />
          Warning
        </Button>
        <Button onClick={handleClickAddToastByAppearance('error')}>
          <Icon icon="error" />
          Error
        </Button>
      </ButtonGroup>
      <Button variant="secondary" onClick={handleClickCloseToasts}>
        Close All
      </Button>
    </Flex>
  );
};

const ToastLayout = (props) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const boxShadow = colorStyle.shadow.thin;

  return (
    <Box
      fontSize="sm"
      lineHeight="sm"
      textAlign="left"
      boxShadow={boxShadow}
      width={320}
      {...props}
    />
  );
};


export default App;
