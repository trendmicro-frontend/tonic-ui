/* eslint-disable react/jsx-no-bind */
import { render } from '@tonic-ui/react/test-utils/render';
import {
  Dropdown,
} from '@tonic-ui/react/src';
import React from 'react';
import DropdownChip from '../DropdownChip';

const items = [
  { value: 'apple', label: 'Apple' },
];

// The chip's props (including `sx`) are spread onto the pill, so the pill is
// where consumer styling lands.
const getPill = (container) => container.querySelector('[data-tonic="DropdownChip"]');

const renderChip = (chipProps) => render(
  <Dropdown
    items={items}
    defaultValue={items[0]}
    renderToggle={({ renderItem, value }) => (
      <DropdownChip {...chipProps}>
        {value ? renderItem(value) : 'Select…'}
      </DropdownChip>
    )}
  />
);

describe('DropdownChip sx override', () => {
  it('renders its own base width style on the pill', () => {
    const { container } = renderChip();
    expect(getPill(container)).toHaveStyleRule('width', '100%');
  });

  it('overrides the pill radius of `Tag` with the chip radius', () => {
    // Passed as a style prop because `Tag`'s own radius is a style prop, which
    // outranks the `__sx` channel.
    const { container } = renderChip();
    expect(getPill(container)).toHaveStyleRule('border-radius', 'var(--tonic-radii-lg)');
  });

  it('reserves room for the close button overlay on the pill', () => {
    const { container } = renderChip({ isClosable: true, onClose: () => {} });
    expect(getPill(container)).toHaveStyleRule('padding-right', 'calc(.5rem - .0625rem + 1rem + .5rem)');
  });

  it('consumer override: sx beats its own base width style', () => {
    const { container } = renderChip({ sx: { width: '50%' } });
    expect(getPill(container)).toHaveStyleRule('width', '50%');
  });

  it('consumer override: sx beats its own base radius', () => {
    const { container } = renderChip({ sx: { borderRadius: '0' } });
    expect(getPill(container)).toHaveStyleRule('border-radius', '0');
  });

  it('wrapper override: an incoming __sx composes with and wins over its own base width style', () => {
    const { container } = renderChip({ __sx: { width: '50%' } });
    expect(getPill(container)).toHaveStyleRule('width', '50%');
  });
});
