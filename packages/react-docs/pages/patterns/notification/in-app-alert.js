import {
  Alert,
  AlertCloseButton,
  Collapse,
  Icon,
  Stack,
  Text,
} from '@tonic-ui/react';
import { useToggle } from '@tonic-ui/react-hooks';
import { runIfFn } from '@tonic-ui/utils';
import React from 'react';

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

const App = () => {
  return (
    <Stack direction="column" spacing="4x">
      <CollapseToggle>
        {({ onClose }) => (
          <Alert
            variant="outline"
            severity="none"
            icon={<Icon icon="light2-o" />}
            onClose={onClose}
            sx={{
              borderImageSource: 'linear-gradient(90deg, var(--tonic-colors-purple-60) 0%, var(--tonic-colors-blue-50) 100%)',
              borderImageSlice: 1,
            }}
          >
            <Text>This is a promotion message.</Text>
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
            <Text pr="10x">This is a success alert.</Text>
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
            <Text pr="10x">This is an info alert.</Text>
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
            <Text pr="10x">This is a warning alert.</Text>
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
            <Text pr="10x">This is an error alert.</Text>
            <AlertCloseButton top={3} right={7} position="absolute" data-test="alert-close-button" />
          </Alert>
        )}
      </CollapseToggle>
    </Stack>
  );
};

export default App;
