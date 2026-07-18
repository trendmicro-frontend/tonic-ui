/* eslint-disable react/jsx-no-bind */
import { render } from '@testing-library/react';
import { ColorModeProvider, EnvironmentProvider } from '@tonic-ui/react/src';
import React from 'react';

const createMatchMedia = (matches) => jest.fn().mockImplementation((query) => ({
  matches,
  media: query,
  onchange: null,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
}));

describe('ColorModeProvider (non-standard DOM environment)', () => {
  it('reads the system color scheme from the window provided by EnvironmentProvider, not the global window', () => {
    // Stub the global window.matchMedia so we can prove it is NOT consulted.
    const globalMatchMedia = createMatchMedia(false);
    Object.defineProperty(window, 'matchMedia', { writable: true, value: globalMatchMedia });

    // Simulate a non-standard DOM environment (e.g. an iframe) by exposing a
    // document node whose `defaultView` is a separate window through
    // EnvironmentProvider.
    const envMatchMedia = createMatchMedia(true);
    const envWindow = { matchMedia: envMatchMedia };
    const envDocument = { nodeType: Node.DOCUMENT_NODE, defaultView: envWindow };

    render(
      <EnvironmentProvider value={() => envDocument}>
        <ColorModeProvider defaultValue="light" useSystemColorMode>
          <div />
        </ColorModeProvider>
      </EnvironmentProvider>
    );

    // The provider must query the environment's window for the system color
    // scheme, proving it resolves `window` via `useEnvironment`.
    expect(envMatchMedia).toHaveBeenCalledWith('(prefers-color-scheme: dark)');

    // And it must NOT fall back to the global window.
    expect(globalMatchMedia).not.toHaveBeenCalled();
  });
});
