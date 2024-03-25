import { Alert, AlertCloseButton, Button, Collapse, Flex, Stack, Text } from '@tonic-ui/react';
import { Light2OIcon } from '@tonic-ui/react-icons';
import { useToggle } from '@tonic-ui/react-hooks';
import { runIfFn } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';

const CollapseToggle = ({
  defaultIsOpen: defaultIsOpenProp = true,
  children,
}) => {
  const [isOpen, toggleIsOpen] = useToggle(defaultIsOpenProp);
  const onOpen = () => toggleIsOpen(true);
  const onClose = () => toggleIsOpen(false);

  return (
    <Collapse in={isOpen} unmountOnExit>
      {runIfFn(children, { isOpen, onOpen, onClose })}
    </Collapse>
  );
};

const AlertSolidActionButton = forwardRef((props, ref) => (
  <Button
    ref={ref}
    size="sm"
    variant="secondary"
    sx={{
      borderColor: 'black:primary',
      color: 'black:primary',
      ':active': {
        color: 'black:primary',
      },
      ':focus': {
        color: 'black:primary',
      },
      ':hover': {
        background: 'rgba(0, 0, 0, 0.12)',
        color: 'black:primary',
      },
      ':hover:not(:focus)': {
        boxShadow: 'none',
      },
    }}
    {...props}
  />
));
AlertSolidActionButton.displayName = 'AlertSolidActionButton';

const App = () => {
  return (
    <Stack direction="column" spacing="4x">
      <CollapseToggle>
        {({ onClose }) => (
          <Alert
            variant="solid"
            severity="none"
            icon={<Light2OIcon />}
            onClose={onClose}
            sx={{
              background: 'linear-gradient(90deg, var(--tonic-colors-purple-60) 0%, var(--tonic-colors-blue-50) 100%)',
              color: 'white:emphasis',
            }}
          >
            <Flex
              alignItems="center"
              justifyContent="space-between"
              columnGap="4x"
              mr="10x"
            >
              <Text>This is a promotion message.</Text>
              <AlertSolidActionButton my="-1x">
                Action
              </AlertSolidActionButton>
            </Flex>
            <AlertCloseButton top={3} right={7} position="absolute" data-test="alert-close-button" />
          </Alert>
        )}
      </CollapseToggle>
      <CollapseToggle>
        {({ onClose }) => (
          <Alert
            variant="solid"
            severity="error"
            onClose={onClose}
          >
            <Flex
              alignItems="center"
              justifyContent="space-between"
              columnGap="4x"
              mr="10x"
            >
              <Text>This is an error message.</Text>
              <AlertSolidActionButton my="-1x">
                Action
              </AlertSolidActionButton>
            </Flex>
            <AlertCloseButton top={3} right={7} position="absolute" data-test="alert-close-button" />
          </Alert>
        )}
      </CollapseToggle>
      <CollapseToggle>
        {({ onClose }) => (
          <Alert
            variant="solid"
            severity="warning"
            onClose={onClose}
          >
            <Flex
              alignItems="center"
              justifyContent="space-between"
              columnGap="4x"
              mr="10x"
            >
              <Text>This is a warning message.</Text>
              <AlertSolidActionButton my="-1x">
                Action
              </AlertSolidActionButton>
            </Flex>
            <AlertCloseButton top={3} right={7} position="absolute" data-test="alert-close-button" />
          </Alert>
        )}
      </CollapseToggle>
      <CollapseToggle>
        {({ onClose }) => (
          <Alert
            variant="solid"
            severity="info"
            onClose={onClose}
          >
            <Flex
              alignItems="center"
              justifyContent="space-between"
              columnGap="4x"
              mr="10x"
            >
              <Text>This is an info message.</Text>
              <AlertSolidActionButton my="-1x">
                Action
              </AlertSolidActionButton>
            </Flex>
            <AlertCloseButton top={3} right={7} position="absolute" data-test="alert-close-button" />
          </Alert>
        )}
      </CollapseToggle>
      <CollapseToggle>
        {({ onClose }) => (
          <Alert
            variant="solid"
            severity="success"
            onClose={onClose}
          >
            <Flex
              alignItems="center"
              justifyContent="space-between"
              columnGap="4x"
              mr="10x"
            >
              <Text>This is a success message.</Text>
            </Flex>
            <AlertCloseButton top={3} right={7} position="absolute" data-test="alert-close-button" />
          </Alert>
        )}
      </CollapseToggle>
    </Stack>
  );
};

export default App;
