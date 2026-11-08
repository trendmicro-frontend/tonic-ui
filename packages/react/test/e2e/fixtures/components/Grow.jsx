/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { Box, Button, Grow } from '../../../../src';

const GrowFixture = ({ params, record }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(Number(params.get('height') || 100));

  const toggle = () => {
    record({ type: isOpen ? 'close' : 'open' });
    setIsOpen(!isOpen);
  };

  // `timeout="auto"` (the default) derives its duration from `clientHeight`, so
  // the content height is the input to the animation timing, not just the
  // visual size.
  const resize = () => setContentHeight(Number(params.get('resizedHeight') || 300));

  return (
    <Box>
      <Button data-testid="toggle" onClick={toggle}>
        Toggle grow
      </Button>
      <Button data-testid="resize" onClick={resize}>
        Resize content
      </Button>
      <Grow in={isOpen} data-testid="grow">
        <Box data-testid="content" sx={{ height: contentHeight }} />
      </Grow>
    </Box>
  );
};

export default GrowFixture;
