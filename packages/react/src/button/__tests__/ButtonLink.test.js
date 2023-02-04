import { screen } from '@testing-library/react';
import { render } from '@tonic-ui/react/test-utils/render';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { ButtonLink } from '@tonic-ui/react/src';
import React from 'react';

describe('ButtonLink', () => {
  it('should render correctly', async () => {
    const { container } = render(
      <ButtonLink
        href="https://github.com/trendmicro-frontend/tonic-ui"
        target="_blank"
        textDecoration="none"
      >
        GitHub
      </ButtonLink>
    );
    await testA11y(container);
  });

  it('verifies the link has the correct href value', () => {
    render(<ButtonLink href="/logout">Log out</ButtonLink>);
    const link = screen.getByRole('link', { name: /log out/i });
    expect(link.href).toBe('http://localhost/logout');
  });
});
