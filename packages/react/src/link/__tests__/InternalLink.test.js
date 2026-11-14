import { render } from '@tonic-ui/react/test-utils/render';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { InternalLink } from '@tonic-ui/react/src';
import React from 'react';

describe('InternalLink', () => {
  it('should render correctly', async () => {
    const { container } = render(
      <>
        <InternalLink href="/default" variant="default">
          Default Internal Link
        </InternalLink>
        <InternalLink href="/inline" variant="inline">
          Inline Internal Link
        </InternalLink>
      </>
    );

    expect(container).toMatchSnapshot();
    await testA11y(container);
  });

  it('should render a right arrow icon', () => {
    const { container } = render(
      <InternalLink href="/">Internal Link</InternalLink>
    );

    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
