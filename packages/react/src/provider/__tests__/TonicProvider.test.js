import { render } from '@tonic-ui/react/test-utils/render';
import { TonicProvider } from '@tonic-ui/react/src';

describe('TonicProvider', () => {
  it('should render children', () => {
    const { getByText } = render(
      <TonicProvider>
        <div>content</div>
      </TonicProvider>
    );

    expect(getByText('content')).toBeInTheDocument();
  });

  it('should log an error when colorMode prop is not an object', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <TonicProvider colorMode="dark">
        <div>content</div>
      </TonicProvider>
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('TonicProvider: "colorMode" prop must be an object if provided.')
    );

    consoleSpy.mockRestore();
  });

  it('should log an error when colorStyle prop is not an object', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <TonicProvider colorStyle="default">
        <div>content</div>
      </TonicProvider>
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('TonicProvider: "colorStyle" prop must be an object if provided.')
    );

    consoleSpy.mockRestore();
  });
});
