import {
  Alert,
  Button,
  Collapse,
  Grid,
  Link,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Skeleton,
  Stack,
  Text,
} from '@tonic-ui/react';
import { useToggle } from '@tonic-ui/react-hooks';
import React from 'react';

const App = () => {
  const [isOpen, toggleIsOpen] = useToggle(true);

  return (
    <>
      <DrawerContent
        margin={0}
        minHeight={400}
        minWidth={480}
        width="50%"
      >
        <DrawerHeader>
          Drawer
        </DrawerHeader>
        <DrawerBody>
          <Collapse in={isOpen}>
            <Alert
              isClosable
              onClose={() => toggleIsOpen(false)}
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
            <Button variant="primary">
              OK
            </Button>
            <Button>
              Cancel
            </Button>
          </Grid>
        </DrawerFooter>
      </DrawerContent>
    </>
  );
};

export default App;
