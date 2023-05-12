import { screen } from '@testing-library/react';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { render } from '@tonic-ui/react/test-utils/render';
import { Text, theme } from '@tonic-ui/react/src';
import React from 'react';

describe('TextLabel', () => {
  it('should render correctly', async () => {
    const renderOptions = {
      useCSSVariables: true,
    };
    const { container } = render((
      <Text>
        Text
      </Text>
    ), renderOptions);

    expect(container).toMatchSnapshot();

    await testA11y(container);
  });

  it('should match expected font size and line height', () => {
    render(
      <>
        <Text size="xs" data-testid="xs">xs</Text>
        <Text size="sm" data-testid="sm">sm</Text>
        <Text size="md" data-testid="md">md</Text>
        <Text size="lg" data-testid="lg">lg</Text>
        <Text size="xl" data-testid="xl">xl</Text>
        <Text size="2xl" data-testid="2xl">2xl</Text>
        <Text size="3xl" data-testid="3xl">3xl</Text>
        <Text size="4xl" data-testid="4xl">4xl</Text>
      </>
    );

    ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'].forEach((size) => {
      expect(screen.getByTestId(size)).toHaveStyle(`font-size: ${theme.fontSizes[size]}; line-height: ${theme.lineHeights[size]};`);
    });
  });
});
