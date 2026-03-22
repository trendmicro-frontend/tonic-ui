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
        <Badge placement="top-left" badgeContent={1}>
          <AlertIcon size="4x" />
        </Badge>
        <Badge placement="top-right" badgeContent={1}>
          <AlertIcon size="4x" />
        </Badge>
        <Badge placement="bottom-left" badgeContent={1}>
          <AlertIcon size="4x" />
        </Badge>
        <Badge placement="bottom-right" badgeContent={1}>
          <AlertIcon size="4x" />
        </Badge>
      </Flex>
    ), renderOptions);

    expect(container).toMatchSnapshot();

    await testA11y(container);
  });

  it('should not render badge content when isInvisible is true', () => {
    const { container } = render(
      <Badge badgeContent={5} isInvisible>
        <AlertIcon size="4x" />
      </Badge>
    );
    expect(container).not.toHaveTextContent('5');
  });

  it('should auto-hide badge when badgeContent is not provided', () => {
    const { container } = render(
      <Badge>
        <AlertIcon size="4x" />
      </Badge>
    );
    // wrapper renders but badge content element is absent
    expect(container.firstChild.childElementCount).toBe(1); // only the child, no badge element
  });

  it('should not render badgeContent when variant="dot"', () => {
    const { container } = render(
      <Badge variant="dot" badgeContent={99}>
        <AlertIcon size="4x" />
      </Badge>
    );
    expect(container).not.toHaveTextContent('99');
  });

  it('should render as standalone when no children are provided', () => {
    const { container } = render(<Badge badgeContent={5} />);
    expect(container).toHaveTextContent('5');
  });

  it('should render badgeContent as a number', () => {
    const { container } = render(
      <Badge badgeContent={42}>
        <AlertIcon size="4x" />
      </Badge>
    );
    expect(container).toHaveTextContent('42');
  });

  it('should render badgeContent as a string', () => {
    const { container } = render(
      <Badge badgeContent="99+">
        <AlertIcon size="4x" />
      </Badge>
    );
    expect(container).toHaveTextContent('99+');
  });
});
