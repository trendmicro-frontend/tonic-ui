import { render } from '@tonic-ui/react/test-utils/render';
import { CSSBaseline } from '@tonic-ui/react/src';

describe('CSSBaseline', () => {
  it('should render without errors', () => {
    expect(() => {
      render(<CSSBaseline />);
    }).not.toThrow();
  });
});
