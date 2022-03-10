import { render } from '@testing-library/react';
import React from 'react';
import { DarkMode } from '../../color-mode';
import Tag from '../Tag';

describe('Tag', () => {
  it('should output deprecation warning message when using the "variantColor" prop', () => {
    const consoleErrorSpy = jest.spyOn(global.console, 'error');
    render(
      <DarkMode>
        <Tag variantColor="red">Sample Tag</Tag>
      </DarkMode>
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('deprecated and will be removed in the next major release.'),
    );
  });

  it('will change tag color', () => {
    const { getByText } = render(
      <DarkMode>
        <Tag backgroundColor="#b80003" color="#fcc3c4">Sample Tag</Tag>
      </DarkMode>
    );

    expect(getByText('Sample Tag')).toHaveStyle('background-color: #b80003; color: #fcc3c4;');
  });
});
