import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import { Autocomplete, EnvironmentProvider } from '@tonic-ui/react/src';
import React from 'react';

describe('Autocomplete (non-standard DOM environment)', () => {
  const items = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
  ];

  it('looks up the highlighted option in the document provided by EnvironmentProvider, not the global document', async () => {
    const user = userEvent.setup();

    // Simulate a non-standard DOM environment (e.g. an iframe) by creating a
    // separate document and exposing one of its nodes through EnvironmentProvider.
    const altDocument = document.implementation.createHTMLDocument('alt');
    const rootNode = altDocument.body;
    const altGetElementById = jest.spyOn(altDocument, 'getElementById');

    render(
      <EnvironmentProvider value={() => rootNode}>
        <Autocomplete items={items} />
      </EnvironmentProvider>
    );

    // Open the listbox and move the highlight with the keyboard, which scrolls
    // the highlighted option into view by resolving it with `getElementById`.
    await user.click(screen.getByRole('combobox'));
    expect(await screen.findByRole('listbox')).toBeInTheDocument();
    await user.keyboard('[ArrowDown]');

    // The option lookup must target the environment's document, proving the
    // hook resolves `document` via `useEnvironment`.
    await waitFor(() => {
      expect(altGetElementById).toHaveBeenCalledWith(expect.any(String));
    });

    altGetElementById.mockRestore();
  });
});
