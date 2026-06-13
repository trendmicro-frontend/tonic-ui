/* eslint-disable react/jsx-no-bind */
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import { Button, EnvironmentProvider, Tooltip } from '@tonic-ui/react/src';

describe('TooltipContent (non-standard DOM environment)', () => {
  it('reads the scroll offset from the window provided by EnvironmentProvider, not the global window', async () => {
    const user = userEvent.setup();

    // Simulate a non-standard DOM environment (e.g. an iframe) by exposing a
    // document node whose `defaultView` is a separate window through
    // EnvironmentProvider.
    const envScrollX = jest.fn(() => 0);
    const envScrollY = jest.fn(() => 0);
    const envWindow = {};
    Object.defineProperty(envWindow, 'scrollX', { get: envScrollX });
    Object.defineProperty(envWindow, 'scrollY', { get: envScrollY });
    const envDocument = { nodeType: Node.DOCUMENT_NODE, defaultView: envWindow };

    render(
      <EnvironmentProvider value={() => envDocument}>
        <Tooltip label="tooltip label" followCursor>
          <Button>button label</Button>
        </Tooltip>
      </EnvironmentProvider>
    );

    // Open the tooltip; positioning runs the offset modifier, which converts the
    // trigger's viewport rect to a page coordinate using the window scroll.
    await user.hover(screen.getByText('button label'));
    expect(await screen.findByRole('tooltip')).toBeInTheDocument();

    // The scroll offset must be read from the environment's window, proving
    // TooltipContent resolves `window` via `useEnvironment`. The global window's
    // `scrollX`/`scrollY` are plain data properties (not spyable getters), so the
    // env window's getters being read is the meaningful signal.
    expect(envScrollX).toHaveBeenCalled();
    expect(envScrollY).toHaveBeenCalled();
  });
});
