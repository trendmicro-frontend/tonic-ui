import {
  Alert,
  Button,
  Collapse,
  Grid,
  Link,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Skeleton,
  Stack,
  Text,
  usePortalManager,
} from '@tonic-ui/react';
import { useToggle } from '@tonic-ui/react-hooks';
import React, { forwardRef } from 'react';

const App = () => {
  const portal = usePortalManager();
  const openDrawer = () => {
    portal((close) => (
      <DrawerExample onClose={close} />
    ));
  };

  return (
    <>
      <Button variant="secondary" onClick={openDrawer}>
        Open Drawer
      </Button>
    </>
  );
};

const DrawerExample = forwardRef((
  {
    onClose,
    ...rest
  },
  ref,
) => {
  const [isAlertOpen, toggleIsAlertOpen] = useToggle(true);

  return (
    <Drawer
      ref={ref}
      backdrop
      closeOnEsc
      closeOnOutsideClick
      isClosable
      isOpen={true}
      onClose={onClose}
      size="md"
      {...rest}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          Drawer
        </DrawerHeader>
        <DrawerBody>
          <Collapse in={isAlertOpen}>
            <Alert
              isClosable
              onClose={() => toggleIsAlertOpen(false)}
              severity="info"
              variant="outline"
              mb="4x"
            >
              <Text display="inline-block" fontWeight="semibold" mr="2x">Important:</Text>
              <Text display="inline-block" mr="2x">This is an important message.</Text>
              <Link>Learn more</Link>
            </Alert>
          </Collapse>
          <Stack direction="column" spacing="4x">
            <Skeleton width={160} />
            <Skeleton width={240} />
            <Skeleton width={240} />
          </Stack>
        </DrawerBody>
        <DrawerFooter>
          <Grid templateColumns="repeat(2, 1fr)" columnGap="2x">
            <Button variant="primary" onClick={onClose}>
              OK
            </Button>
            <Button onClick={onClose}>
              Cancel
            </Button>
          </Grid>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
});

DrawerExample.displayName = 'DrawerExample';

export default App;
