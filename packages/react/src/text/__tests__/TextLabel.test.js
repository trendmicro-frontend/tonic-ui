import { screen } from '@testing-library/react';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { render } from '@tonic-ui/react/test-utils/render';
import { TextLabel } from '@tonic-ui/react/src';
import React from 'react';

describe('TextLabel', () => {
  it('should render correctly', async () => {
    const renderOptions = {
      useCSSVariables: true,
    };
    const { container } = render((
      <TextLabel data-testid="TextLabel">
        TextLabel
      </TextLabel>
    ), renderOptions);

    expect(screen.getByTestId('TextLabel').tagName).toBe('LABEL');

    expect(container).toMatchSnapshot();

    await testA11y(container);
  });
});
