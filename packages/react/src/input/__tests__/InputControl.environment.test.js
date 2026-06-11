/* eslint-disable react/jsx-no-bind */
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import { EnvironmentProvider, InputControl } from '@tonic-ui/react/src';

describe('InputControl (non-standard DOM environment)', () => {
  it('constructs the MutationObserver from the window provided by EnvironmentProvider, not the global window', async () => {
    const user = userEvent.setup();

    // Simulate a non-standard DOM environment (e.g. an iframe) by exposing a
    // document node whose `defaultView` is a separate window through
    // EnvironmentProvider.
    const observe = jest.fn();
    const disconnect = jest.fn();
    const EnvMutationObserver = jest.fn().mockImplementation(() => ({ observe, disconnect }));
    const envWindow = { MutationObserver: EnvMutationObserver };
    const envDocument = { nodeType: Node.DOCUMENT_NODE, defaultView: envWindow };

    render(
      <EnvironmentProvider value={() => envDocument}>
        <InputControl data-testid="input" />
      </EnvironmentProvider>
    );

    // Typing forces the validity-observing effect to run against the populated
    // input ref.
    await user.type(screen.getByTestId('input'), 'a');

    // The MutationObserver must be constructed from the environment's window,
    // proving InputControl resolves `window` via `useEnvironment`.
    await waitFor(() => {
      expect(EnvMutationObserver).toHaveBeenCalled();
    });
    expect(observe).toHaveBeenCalled();
  });
});
