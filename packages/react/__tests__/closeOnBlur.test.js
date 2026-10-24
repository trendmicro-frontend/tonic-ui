import { render } from '@tonic-ui/react/test-utils/render';
import { Menu, MenuContent, Popover, PopoverContent } from '@tonic-ui/react/src';
import React from 'react';

describe.each([
  { name: 'Menu', Root: Menu, Content: MenuContent, target: 'root' },
  { name: 'MenuContent', Root: Menu, Content: MenuContent, target: 'content' },
  { name: 'Popover', Root: Popover, Content: PopoverContent, target: 'root' },
  { name: 'PopoverContent', Root: Popover, Content: PopoverContent, target: 'content' },
])('$name closeOnBlur deprecation', ({ name, Root, Content, target }) => {
  let consoleErrorSpy;

  const TestComponent = ({ legacyProps = {} }) => (
    <Root defaultIsOpen {...(target === 'root' ? legacyProps : {})}>
      <Content {...(target === 'content' ? legacyProps : {})}>Content</Content>
    </Root>
  );

  const deprecationWarnings = () => consoleErrorSpy.mock.calls.filter(([message]) => (
    typeof message === 'string' &&
    message.startsWith(`${name}:`) &&
    message.includes('closeOnBlur') &&
    message.includes('deprecated') &&
    message.includes('closeOnInteractOutside')
  ));

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it.each([true, false])('warns once when closeOnBlur is %s and does not forward it to the DOM', (closeOnBlur) => {
    const { container, rerender } = render(<TestComponent legacyProps={{ closeOnBlur }} />);

    expect(deprecationWarnings()).toHaveLength(1);
    expect(container.querySelector('[closeonblur]')).toBeNull();
    expect(consoleErrorSpy.mock.calls.some((args) => args.some((arg) => (
      typeof arg === 'string' && arg.includes('does not recognize')
    )))).toBe(false);

    rerender(<TestComponent legacyProps={{ closeOnBlur: !closeOnBlur }} />);
    expect(deprecationWarnings()).toHaveLength(1);
  });

  it('does not warn without closeOnBlur, but warns if it is supplied on a later render', () => {
    const { rerender } = render(<TestComponent />);
    expect(deprecationWarnings()).toHaveLength(0);

    rerender(<TestComponent legacyProps={{ closeOnBlur: undefined }} />);
    expect(deprecationWarnings()).toHaveLength(0);

    rerender(<TestComponent legacyProps={{ closeOnBlur: false }} />);
    expect(deprecationWarnings()).toHaveLength(1);
  });
});
