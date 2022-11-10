import { render } from '@tonic-ui/react/test-utils/render';
import { Tag } from '@tonic-ui/react/src';
import React from 'react';

describe('Tag', () => {
  const consoleErrorSpy = jest.spyOn(global.console, 'error').mockImplementation(() => {});

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('should output deprecation warning message when using the "variantColor" prop', () => {
    render(
      <Tag variantColor="red">Test Tag</Tag>
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('deprecated and will be removed in the next major release.'),
    );
  });

  it('will change tag color', () => {
    const { getByText } = render(
      <Tag backgroundColor="#b80003" color="#fcc3c4">Test Tag</Tag>
    );

    expect(getByText('Test Tag')).toHaveStyle('background-color: #b80003; color: #fcc3c4;');
  });
});
