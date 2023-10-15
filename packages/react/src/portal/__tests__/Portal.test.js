import { screen } from '@testing-library/react';
import { render } from '@tonic-ui/react/test-utils/render';
import { Portal } from '@tonic-ui/react/src';
import React from 'react';

describe('Portal', () => {
  it('should render correctly', () => {
    const renderOptions = {
      useCSSVariables: true,
    };
    const { container } = render((
      <Portal>
        This is a portal
        <Portal>This is another portal</Portal>
      </Portal>
    ), renderOptions);

    expect(container).toMatchSnapshot();
  });

  it('should render nested portal', () => {
    const { baseElement } = render(
      <Portal>
        This is a portal
        <Portal appendToParentPortal={true}>This is a nested portal</Portal>
      </Portal>
    );

    const portals = Array.from(
      baseElement.querySelectorAll(Portal.selector)
    );

    const [parentPortal, childPortal] = portals;
    expect(parentPortal).toContainElement(childPortal);
  });

  it('should render in a different node', () => {
    render(
      <div data-testid="parent">
        <div data-testid="child-1">Child 1</div>
        <Portal>
          <div data-testid="child-2">Child 2</div>
        </Portal>
      </div>
    );

    const parent = screen.getByTestId('parent');
    const child1 = screen.getByTestId('child-1');
    const child2 = screen.getByTestId('child-2');

    expect(parent).toContainElement(child1);
    expect(parent).not.toContainElement(child2);
  });

  it('should render into a custom container', () => {
    const TestComponent = () => {
      const ref = React.useRef(null);
      return (
        <>
          <div data-testid="container" ref={ref} />
          <Portal containerRef={ref}>
            <div data-testid="content">Hello world</div>
          </Portal>
        </>
      );
    };

    render(<TestComponent />);

    const content = screen.getByTestId('content');
    const container = screen.getByTestId('container');
    expect(container).toContainElement(content);
  });
});
