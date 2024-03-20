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

const AlertOutlineActionButton = forwardRef((props, ref) => (
  <Button
    ref={ref}
    size="sm"
    variant="secondary"
    {...props}
  />
));
AlertOutlineActionButton.displayName = 'AlertOutlineActionButton';

const App = () => {
  return (
    <Stack direction="column" spacing="4x">
      <CollapseToggle>
        {({ onClose }) => (
          <Alert
            variant="outline"
            severity="none"
            icon={<Light2OIcon />}
            onClose={onClose}
            sx={{
              borderImageSource: 'linear-gradient(90deg, var(--tonic-colors-purple-60) 0%, var(--tonic-colors-blue-50) 100%)',
              borderImageSlice: 1,
            }}
          >
            <Flex
              alignItems="center"
              justifyContent="space-between"
              mr="10x"
            >
              <Text>This is a promotion message.</Text>
              <AlertOutlineActionButton my="-1x">
                Action
              </AlertOutlineActionButton>
            </Flex>
            <AlertCloseButton top={3} right={7} position="absolute" data-test="alert-close-button" />
          </Alert>
        )}
      </CollapseToggle>
      <CollapseToggle>
        {({ onClose }) => (
          <Alert
            variant="outline"
            severity="error"
            onClose={onClose}
          >
            <Flex
              alignItems="center"
              justifyContent="space-between"
              mr="10x"
            >
              <Text>This is an error message.</Text>
              <AlertOutlineActionButton my="-1x">
                Action
              </AlertOutlineActionButton>
            </Flex>
            <AlertCloseButton top={3} right={7} position="absolute" data-test="alert-close-button" />
          </Alert>
        )}
      </CollapseToggle>
      <CollapseToggle>
        {({ onClose }) => (
          <Alert
            variant="outline"
            severity="warning"
            onClose={onClose}
          >
            <Flex
              alignItems="center"
              justifyContent="space-between"
              mr="10x"
            >
              <Text>This is a warning message.</Text>
              <AlertOutlineActionButton my="-1x">
                Action
              </AlertOutlineActionButton>
            </Flex>
            <AlertCloseButton top={3} right={7} position="absolute" data-test="alert-close-button" />
          </Alert>
        )}
      </CollapseToggle>
      <CollapseToggle>
        {({ onClose }) => (
          <Alert
            variant="outline"
            severity="info"
            onClose={onClose}
          >
            <Flex
              alignItems="center"
              justifyContent="space-between"
              mr="10x"
            >
              <Text>This is an info message.</Text>
              <AlertOutlineActionButton my="-1x">
                Action
              </AlertOutlineActionButton>
            </Flex>
            <AlertCloseButton top={3} right={7} position="absolute" data-test="alert-close-button" />
          </Alert>
        )}
      </CollapseToggle>
      <CollapseToggle>
        {({ onClose }) => (
          <Alert
            variant="outline"
            severity="success"
            onClose={onClose}
          >
            <Flex
              alignItems="center"
              justifyContent="space-between"
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
