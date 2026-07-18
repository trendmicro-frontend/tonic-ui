import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { render } from '@tonic-ui/react/test-utils/render';
import { Badge, Flex } from '@tonic-ui/react/src';
import { AlertIcon } from '@tonic-ui/react-icons/src';
import React from 'react';

describe('Badge', () => {
  it('should render correctly', async () => {
    const renderOptions = {};
    const { container } = render((
      <Flex columnGap="4x">
        <Badge variant="dot" />
        <Badge variant="solid" badgeContent={5} />
        <Badge variant="dot">
          <AlertIcon size="4x" />
        </Badge>
        <Badge variant="solid" badgeContent={5}>
          <AlertIcon size="4x" />
        </Badge>
        <Badge variant="solid" badgeContent="99+">
          <AlertIcon size="4x" />
        </Badge>
      </Flex>
    ), renderOptions);

    expect(container).toMatchSnapshot();

    await testA11y(container);
  });

  describe('variants', () => {
    const variants = ['solid', 'dot'];
    const placements = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];

    variants.forEach((variant) => {
      it(`should render ${variant} variant`, () => {
        const { asFragment } = render(
          <Badge variant={variant} badgeContent={variant === 'solid' ? 5 : undefined}>
            <AlertIcon size="4x" />
          </Badge>
        );
        expect(asFragment()).toMatchSnapshot();
      });
    });

    placements.forEach((placement) => {
      it(`should render with ${placement} placement`, () => {
        const { asFragment } = render(
          <Badge variant="solid" badgeContent={5} placement={placement}>
            <AlertIcon size="4x" />
          </Badge>
        );
        expect(asFragment()).toMatchSnapshot();
      });
    });
  });
});
