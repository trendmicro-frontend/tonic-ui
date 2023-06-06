import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { render } from '@tonic-ui/react/test-utils/render';
import { Divider, Stack } from '@tonic-ui/react/src';
import React from 'react';

describe('Divider', () => {
  it('should render correctly', async () => {
    const renderOptions = {
      useCSSVariables: true,
    };
    const { container } = render((
      <>
        <Stack direction="column" spacing="4x">
          <Divider variand="solid" orientation="horizontal" />
          <Divider variant="dashed" orientation="horizontal" />
          <Divider variant="dotted" orientation="horizontal" />
        </Stack>
        <Stack direction="row" spacing="4x" height="4x">
          <Divider variant="solid" orientation="vertical" />
          <Divider variant="dashed" orientation="vertical" />
          <Divider variant="dotted" orientation="vertical" />
        </Stack>
      </>
    ), renderOptions);

    expect(container).toMatchSnapshot();

    await testA11y(container);
  });
});
