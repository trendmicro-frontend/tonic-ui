import { render } from '@tonic-ui/react/test-utils/render';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { Code } from '@tonic-ui/react/src';
import React from 'react';

describe('Code', () => {
  it('should render correctly', async () => {
    const renderOptions = {
      useCSSVariables: true,
    };
    const { container } = render((
      <Code>Hello World</Code>
    ), renderOptions);

    expect(container).toMatchSnapshot();

    await testA11y(container);
  });
});
