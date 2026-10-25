/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { Box, Grow } from '../../../../src';

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
    <div>
      <button type="button" data-testid="toggle" onClick={toggle}>
        Toggle grow
      </button>
      <button type="button" data-testid="resize" onClick={resize}>
        Resize content
      </button>
      <Grow in={isOpen} data-testid="grow">
        <Box data-testid="content" height={contentHeight} />
      </Grow>
    </div>
  );
};

export default GrowFixture;
