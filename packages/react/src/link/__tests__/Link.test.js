import { render } from '@tonic-ui/react/test-utils/render';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { Link } from '@tonic-ui/react/src';
import React from 'react';

describe('Link', () => {
  it('should render correctly', async () => {
    const { container } = render(
      <Link
        href="https://github.com/trendmicro-frontend/tonic-ui"
        target="_blank"
      >
        GitHub
      </Link>
    );
    await testA11y(container);
  });
});
