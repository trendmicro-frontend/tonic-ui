import { Button, Flex, Grid, Link, Popover, PopoverBody, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Popover>
    {({ isOpen, onClose }) => (
      <>
        <PopoverTrigger>
          <Button variant="secondary">Trigger</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>
            Popover Header
          </PopoverHeader>
          <PopoverBody>
            Popover Body
          </PopoverBody>
          <PopoverFooter>
            <Flex
              justifyContent="space-between"
              columnGap="4x"
            >
              <Link fontSize="sm">Learn more</Link>
              <Grid
                templateColumns="1fr 1fr"
                columnGap="2x"
              >
                <Button variant="primary">Submit</Button>
                <Button variant="default" onClick={onClose}>
                  Cancel
                </Button>
              </Grid>
            </Flex>
          </PopoverFooter>
        </PopoverContent>
      </>
    )}
  </Popover>
);

export default App;
