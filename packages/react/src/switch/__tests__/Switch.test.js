import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { render } from '@tonic-ui/react/test-utils/render';
import { Switch } from '@tonic-ui/react/src';
import React from 'react';

describe('Switch', () => {
  it('should render correctly', async () => {
    const renderOptions = {
      useCSSVariables: true,
    };
    const { container } = render((
      <>
        {/* Sizes */}
        <Switch size="sm" name="sizes">Switch</Switch>
        <Switch size="md" name="sizes">Switch</Switch>
        <Switch size="lg" name="sizes">Switch</Switch>

        {/* States */}
        <Switch defaultChecked={false}>Switch</Switch>
        <Switch defaultChecked>Switch</Switch>
        <Switch disabled>Switch</Switch>
        <Switch disabled defaultChecked>Switch</Switch>
      </>
    ), renderOptions);

    expect(container).toMatchSnapshot();

    await testA11y(container);
  });
});
