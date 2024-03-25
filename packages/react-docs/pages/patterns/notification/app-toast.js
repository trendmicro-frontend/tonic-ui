import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Text,
  Toast,
  useColorMode,
  useColorStyle,
  useToastManager,
} from '@tonic-ui/react';
import { ErrorIcon, InfoIcon, SuccessIcon, WarningMinorIcon } from '@tonic-ui/react-icons';
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
      const isTop = placement.includes('top');
      const toastSpacingKey = isTop ? 'pb' : 'pt';

      return (
        <ToastLayout
          sx={{
            [toastSpacingKey]: '2x',
            width: 320,
          }}
        >
          <Toast appearance={appearance} isClosable onClose={onClose}>
            {content}
          </Toast>
        </ToastLayout>
      );
    }, options);

    const isTop = placement.includes('top');

    // Limit the maximum number of toasts
    if (isTop) {
      toast.setState(prevState => ({
        ...prevState,
        [placement]: prevState[placement].slice(0, MAX_TOASTS),
      }));
    } else {
      toast.setState(prevState => ({
        ...prevState,
        [placement]: prevState[placement].slice(-MAX_TOASTS),
      }));
    }
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
          <SuccessIcon />
          Success
        </Button>
        <Button onClick={handleClickAddToastByAppearance('info')}>
          <InfoIcon />
          Info
        </Button>
        <Button onClick={handleClickAddToastByAppearance('warning')}>
          <WarningMinorIcon />
          Warning
        </Button>
        <Button onClick={handleClickAddToastByAppearance('error')}>
          <ErrorIcon />
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
      {...props}
    />
  );
};

export default App;
