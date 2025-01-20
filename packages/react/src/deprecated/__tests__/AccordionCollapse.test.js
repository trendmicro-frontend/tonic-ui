import { render } from '@tonic-ui/react/test-utils/render';
import { AccordionCollapse } from '@tonic-ui/react/src';
import React from 'react';

describe('AccordionCollapse component', () => {
  it('logs a deprecation warning when used', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<AccordionCollapse />);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Warning: The `AccordionCollapse` component is deprecated and will be removed in the next major release. Use the `AccordionContent` component instead.'
    );

    consoleErrorSpy.mockRestore();
  });
});
