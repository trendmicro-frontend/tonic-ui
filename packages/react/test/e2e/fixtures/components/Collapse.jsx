/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { Box, Collapse } from '../../../../src';

// Collapse reports every react-transition-group lifecycle callback so browser
// tests can prove the callbacks still fire around the real measured animation.
const LIFECYCLE_PROPS = ['onEnter', 'onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited'];

const CollapseFixture = ({ params, record }) => {
  const [isOpen, setIsOpen] = useState(params.has('initiallyOpen'));
  const [contentHeight, setContentHeight] = useState(Number(params.get('height') || 100));

  const lifecycleProps = LIFECYCLE_PROPS.reduce((props, name) => {
    const type = name.slice(2).toLowerCase();
    props[name] = () => record({ type });
    return props;
  }, {});

  const collapseProps = {
    appear: params.has('appear'),
    in: isOpen,
    ...lifecycleProps,
  };
  if (params.has('collapsedHeight')) {
    collapseProps.collapsedHeight = Number(params.get('collapsedHeight'));
  }

  const toggle = () => {
    record({ type: isOpen ? 'close' : 'open' });
    setIsOpen(!isOpen);
  };

  // The collapsed element only uses `height: auto` once entered, so a real
  // content resize after expanding proves the height is not pinned to the
  // value measured during the enter transition.
  const resize = () => setContentHeight(Number(params.get('resizedHeight') || 160));

  return (
    <div>
      <button type="button" data-testid="toggle" onClick={toggle}>
        Toggle collapse
      </button>
      <button type="button" data-testid="resize" onClick={resize}>
        Resize content
      </button>
      <Collapse data-testid="collapse" {...collapseProps}>
        <Box data-testid="content" height={contentHeight} />
      </Collapse>
    </div>
  );
};

export default CollapseFixture;
