import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@tonic-ui/react/src';
import React from 'react';

describe('PopoverContent (non-standard DOM environment)', () => {
  it('dismisses the popover when clicking inside the document that owns the popover elements', async () => {
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);

    const iframeDocument = iframe.contentDocument;
    const container = iframeDocument.createElement('div');
    iframeDocument.body.appendChild(container);

    const user = userEvent.setup({ document: iframeDocument });
    const onInteractOutside = jest.fn();

    const { getByTestId, queryByTestId } = render(
      <Popover
        defaultIsOpen
        portalled
        onInteractOutside={onInteractOutside}
      >
        <PopoverTrigger data-testid="popover-trigger">
          <Button>Open</Button>
        </PopoverTrigger>
        <PopoverContent data-testid="popover-content">
          Popover content
        </PopoverContent>
      </Popover>,
      { container, baseElement: iframeDocument.body }
    );

    try {
      await waitFor(() => {
        expect(getByTestId('popover-content')).toBeInTheDocument();
      });

      // Clicks inside the content are internal interactions
      await user.click(getByTestId('popover-content'));
      expect(onInteractOutside).not.toHaveBeenCalled();

      // Outside interactions must be observed on the document that owns the
      // popover elements (here: the iframe document), not on the global `document`
      await user.click(iframeDocument.body);

      await waitFor(() => {
        expect(onInteractOutside).toHaveBeenCalledTimes(1);
        expect(queryByTestId('popover-content')).not.toBeInTheDocument();
      });
    } finally {
      iframe.remove();
    }
  });
});
