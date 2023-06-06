import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { render } from '@tonic-ui/react/test-utils/render';
import { Badge, Flex, Icon } from '@tonic-ui/react/src';
import React from 'react';

describe('Badge', () => {
  it('should render correctly', async () => {
    const renderOptions = {
      useCSSVariables: true,
    };
    const { container } = render((
      <Flex columnGap="4x">
        <Badge variant="dot" />
        <Badge variant="solid" badgeContent={5} />
        <Badge variant="dot">
          <Icon icon="alert" />
        </Badge>
        <Badge variant="solid" badgeContent={5}>
          <Icon icon="alert" />
        </Badge>
        <Badge variant="solid" badgeContent="99+">
          <Icon icon="alert" />
        </Badge>
      </Flex>
    ), renderOptions);

    expect(container).toMatchSnapshot();

    await testA11y(container);
  });
});
