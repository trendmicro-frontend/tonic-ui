import { render } from '@testing-library/react';
import React from 'react';
import DarkMode from '../../color-mode/DarkMode';
import Tag from '../Tag';

describe('<Tag />', () => {
  test('log a deprecation warning message for using variantColor prop', () => {
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

  test('change tag color', () => {
    const { getByText } = render(
      <DarkMode>
        <Tag backgroundColor="#b80003" color="#fcc3c4">Sample Tag</Tag>
      </DarkMode>
    );

    expect(getByText('Sample Tag')).toHaveStyle('background-color: #b80003; color: #fcc3c4;');
  });
});
