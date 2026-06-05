import { Mark } from '@tonic-ui/react/src';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { render } from '@tonic-ui/react/test-utils/render';

describe('Mark', () => {
  it('should render correctly', async () => {
    const { container } = render(
      <Mark>Hello World</Mark>
    );

    expect(container).toBeInTheDocument();
    expect(container.firstChild.tagName).toBe('MARK');
    expect(container).toHaveTextContent('Hello World');

    expect(container).toMatchSnapshot();

    await testA11y(container);
  });

  it('should render with "highlight" variant', () => {
    const { container } = render(
      <Mark variant="highlight">Hello World</Mark>
    );

    expect(container.firstChild).toHaveStyleRule('background-color', '#fce79e');
    expect(container.firstChild).toHaveStyleRule('color', 'var(--tonic-colors-black-primary)');
  });

  it('should render with "emphasis" variant', () => {
    const { container } = render(
      <Mark variant="emphasis">Hello World</Mark>
    );

    expect(container.firstChild).toHaveStyleRule('font-weight', 'var(--tonic-fontWeights-semibold)');
    expect(container.firstChild).toHaveStyleRule('background-color', 'inherit');
  });

  it('should render Mark with custom background and text colors', () => {
    const { container } = render(
      <Mark
        sx={{
          backgroundColor: 'blue:60',
          color: 'white:primary',
        }}
      >
        Hello World
      </Mark>
    );

    expect(container.firstChild).toHaveStyleRule('background-color', 'var(--tonic-colors-blue-60)');
    expect(container.firstChild).toHaveStyleRule('color', 'var(--tonic-colors-white-primary)');
  });
});
