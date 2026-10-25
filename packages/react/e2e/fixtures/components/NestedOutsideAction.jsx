/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { Menu, MenuButton, MenuContent, Popover, PopoverContent, PopoverTrigger } from '../../../src';

const NestedOutsideAction = ({ params, record }) => {
  const [mounted, setMounted] = useState(true);
  const isMenu = params.get('component') === 'menu';
  const Parent = isMenu ? Menu : Popover;
  const Trigger = isMenu ? MenuButton : PopoverTrigger;
  const Content = isMenu ? MenuContent : PopoverContent;

  if (!mounted) {
    return null;
  }

  return (
    <Parent
      defaultIsOpen
      {...(isMenu ? { closeOnSelect: false } : {})}
      onClose={() => {
        record({ type: 'close' });
        setMounted(false);
      }}
      onInteractOutside={event => {
        if (params.has('cancel')) {
          event.preventDefault();
        }
        record({ type: 'outside' });
      }}
    >
      <Trigger>{isMenu ? 'Parent' : <button type="button">Parent</button>}</Trigger>
      <Content data-testid="parent-content" slotProps={{ transition: { timeout: 0 } }}>
        <Popover portalled>
          <PopoverTrigger><button type="button" data-testid="child-trigger">Child</button></PopoverTrigger>
          <PopoverContent slotProps={{ transition: { timeout: 0 } }}>
            <button
              type="button"
              data-testid="child-action"
              onClick={() => {
                record({ type: 'action' });
                if (params.has('unmountOnAction')) {
                  setMounted(false);
                }
              }}
            >
              Child action
            </button>
          </PopoverContent>
        </Popover>
      </Content>
    </Parent>
  );
};

export default NestedOutsideAction;
