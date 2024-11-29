import { screen } from '@testing-library/react';
import { render } from '@tonic-ui/react/test-utils/render';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { Code } from '@tonic-ui/react/src';
import React from 'react';

describe('Code', () => {
  it('should render correctly', async () => {
    const renderOptions = {};
    const { container } = render((
      <Code data-testid="Code">
        Code
      </Code>
    ), renderOptions);

    expect(screen.getByTestId('Code').tagName).toBe('CODE');

    expect(container).toMatchSnapshot();

    await testA11y(container);
  });
});
