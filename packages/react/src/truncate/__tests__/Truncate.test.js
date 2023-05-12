import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { render } from '@tonic-ui/react/test-utils/render';
import { Truncate } from '@tonic-ui/react/src';
import React from 'react';

describe('Truncate', () => {
  it('should render correctly', async () => {
    const renderOptions = {
      useCSSVariables: true,
    };
    const { container } = render((
      <Truncate width={120}>
        This is a very long text that will be truncated
      </Truncate>
    ), renderOptions);

    expect(container).toMatchSnapshot();

    await testA11y(container);
  });
});
