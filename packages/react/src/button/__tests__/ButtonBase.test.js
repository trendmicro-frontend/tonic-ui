import { render } from '@tonic-ui/react/test-utils/render';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { ButtonBase } from '@tonic-ui/react/src';
import React from 'react';

describe('ButtonBase', () => {
  it('should render correctly', async () => {
    const renderOptions = {
      useCSSVariables: true,
    };
    const { container } = render((
      <>
        <ButtonBase>
          Normal button
        </ButtonBase>
        <ButtonBase disabled>
          Disabled button
        </ButtonBase>
      </>
    ), renderOptions);

    expect(container).toMatchSnapshot();

    await testA11y(container);
  });
});
