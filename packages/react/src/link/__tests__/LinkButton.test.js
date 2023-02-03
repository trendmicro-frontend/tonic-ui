import { render } from '@tonic-ui/react/test-utils/render';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { LinkButton } from '@tonic-ui/react/src';
import React from 'react';

describe('LinkButton', () => {
  it('should render correctly', async () => {
    const { container } = render(
      <LinkButton
        href="https://github.com/trendmicro-frontend/tonic-ui"
        target="_blank"
      >
        GitHub
      </LinkButton>
    );
    await testA11y(container);
  });
});
