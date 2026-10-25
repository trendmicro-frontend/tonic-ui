/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { Dropdown, DropdownToggle } from '../../../src';

const items = [
  { value: 'one', label: 'Item one' },
  { type: 'custom', label: <div data-testid="inside" role="presentation">Custom content</div> },
  {
    type: 'submenu',
    label: 'More items',
    props: { 'data-testid': 'submenu-trigger' },
    children: [
      { value: 'two', label: 'Nested item two', props: { 'data-testid': 'nested-item' } },
      { type: 'custom', label: <div data-testid="submenu-inside" role="presentation">Submenu content</div> },
    ],
  },
  { value: 'three', label: 'Item three' },
];

const DropdownFixture = ({ params, record }) => {
  const [isOpen, setIsOpen] = useState(params.has('initiallyOpen'));

  return (
    <Dropdown
      items={items}
      defaultIsOpen={params.has('initiallyOpen')}
      closeOnInteractOutside={params.has('optOut') ? false : undefined}
      portalled={params.has('portalled')}
      {...(params.has('controlled') ? { isOpen } : {})}
      onOpen={() => {
        record({ type: 'open' });
        if (!params.has('holdOpen')) {
          setIsOpen(true);
        }
      }}
      onClose={() => {
        record({ type: 'close' });
        if (!params.has('holdOpen')) {
          setIsOpen(false);
        }
      }}
      onInteractOutside={(event) => {
        if (params.has('cancel')) {
          event.preventDefault();
        }
        record({
          type: 'outside',
          eventType: event.type,
          target: event.target.dataset.testid,
          cancelable: event.cancelable,
          defaultPrevented: event.defaultPrevented,
        });
      }}
      onChange={(item) => record({ type: 'change', value: item?.value })}
      renderToggle={({ renderItem, value }) => (
        <DropdownToggle data-testid="trigger">
          {value ? renderItem(value) : 'Open dropdown'}
        </DropdownToggle>
      )}
      slotProps={{
        content: {
          'data-testid': 'content',
          slotProps: { transition: { timeout: 0 } },
        },
      }}
    />
  );
};

export default DropdownFixture;
