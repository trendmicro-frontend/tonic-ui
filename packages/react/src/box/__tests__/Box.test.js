import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { render } from '@tonic-ui/react/test-utils/render';
import { Box } from '@tonic-ui/react/src';
import React from 'react';

describe('Box', () => {
  it('should render correctly', async () => {
    const renderOptions = {
      useCSSVariables: true,
    };
    const { container } = render((
      <Box>This is a box</Box>
    ), renderOptions);

    expect(container).toMatchSnapshot();

    await testA11y(container);
  });

  it('should work correctly with the `as` prop', () => {
    const { getByText } = render(
      <Box as="a" href="www.example.com">
        Box
      </Box>
    );
    expect(getByText('Box').tagName).toBe('A');
  });
});
