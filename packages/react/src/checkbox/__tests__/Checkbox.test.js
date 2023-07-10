import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { render } from '@tonic-ui/react/test-utils/render';
import { Checkbox } from '@tonic-ui/react/src';
import React from 'react';

describe('Checkbox', () => {
  it('should render correctly', async () => {
    const renderOptions = {
      useCSSVariables: true,
    };
    const { container } = render((
      <>
        {/* Sizes */}
        <Checkbox size="sm">Checkbox</Checkbox>
        <Checkbox size="md">Checkbox</Checkbox>
        <Checkbox size="lg">Checkbox</Checkbox>

        {/* States */}
        <Checkbox>Checkbox</Checkbox>
        <Checkbox indeterminate>Checkbox</Checkbox>
        <Checkbox defaultChecked>Checkbox</Checkbox>
        <Checkbox disabled>Checkbox</Checkbox>
        <Checkbox disabled indeterminate>Checkbox</Checkbox>
        <Checkbox disabled defaultChecked>Checkbox</Checkbox>
      </>
    ), renderOptions);

    expect(container).toMatchSnapshot();

    await testA11y(container);
  });
});
