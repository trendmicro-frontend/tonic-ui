import { testA11y } from '../../../test-utils/accessibility';
import { render } from '../../../test-utils/render';
import { Box } from '..';

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
