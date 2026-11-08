import { screen } from '@testing-library/react';
import { render } from '@tonic-ui/react/test-utils/render';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { ExternalLink } from '@tonic-ui/react/src';
import React from 'react';

describe('ExternalLink', () => {
  it('should render correctly', async () => {
    const { container } = render(
      <>
        <ExternalLink href="https://default.example.com" variant="default">
          Default External Link
        </ExternalLink>
        <ExternalLink href="https://inline.example.com" variant="inline">
          Inline External Link
        </ExternalLink>
      </>
    );

    expect(container).toMatchSnapshot();
    await testA11y(container);
  });

  it('should open in a new window by default', () => {
    render(
      <ExternalLink href="https://example.com">External Link</ExternalLink>
    );

    const link = screen.getByRole('link', { name: /external link/i });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should allow target and rel to be overridden', () => {
    render(
      <ExternalLink href="https://example.com" target="_self" rel="nofollow">
        External Link
      </ExternalLink>
    );

    const link = screen.getByRole('link', { name: /external link/i });
    expect(link).toHaveAttribute('target', '_self');
    expect(link).toHaveAttribute('rel', 'nofollow');
  });
});
