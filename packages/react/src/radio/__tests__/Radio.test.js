import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { render } from '@tonic-ui/react/test-utils/render';
import { Radio } from '@tonic-ui/react/src';
import React from 'react';

describe('Radio', () => {
  it('should render correctly', async () => {
    const renderOptions = {
      useCSSVariables: true,
    };
    const { container } = render((
      <>
        {/* Sizes */}
        <Radio size="sm" name="sizes">Radio</Radio>
        <Radio size="md" name="sizes">Radio</Radio>
        <Radio size="lg" name="sizes">Radio</Radio>

        {/* States */}
        <Radio defaultChecked={false}>Radio</Radio>
        <Radio defaultChecked>Radio</Radio>
        <Radio disabled>Radio</Radio>
        <Radio disabled defaultChecked>Radio</Radio>
      </>
    ), renderOptions);

    expect(container).toMatchSnapshot();

    await testA11y(container);
  });
});
