import { screen } from '@testing-library/react';
import { render } from '@tonic-ui/react/test-utils/render';
import { Portal } from '@tonic-ui/react/src';
import { PortalContext } from '@tonic-ui/react/src/portal/context';
import React from 'react';

describe('Portal', () => {
  it('should render correctly', () => {
    const renderOptions = {};
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

  it('should render into document.body by default', () => {
    render(
      <Portal>
        <div data-testid="content">Hello world</div>
      </Portal>
    );

    // Key off the content's own portal — the wrapper's ToastManager/PortalManager also
    // render `.tonic-ui-portal` nodes into document.body, so a first-match query is ambiguous.
    const content = screen.getByTestId('content');
    const portalEl = content.closest(Portal.selector);
    expect(portalEl).not.toBeNull();
    expect(document.body).toContainElement(portalEl);
  });

  it('should render into the shadow root when mounted inside one', () => {
    // Mount the Portal's tree inside a shadow root so the probe node's native
    // `getRootNode()` resolves to the ShadowRoot — the portal must land there,
    // not in the host document's body. The host stays detached so the test leaves
    // nothing behind in document.body even if an assertion throws.
    const host = document.createElement('div');
    const shadowRoot = host.attachShadow({ mode: 'open' });
    const container = document.createElement('div');
    shadowRoot.appendChild(container);

    render(
      <Portal>
        <div data-testid="shadow-content">Hello shadow</div>
      </Portal>,
      { container }
    );

    const content = shadowRoot.querySelector('[data-testid="shadow-content"]');
    const portalEl = shadowRoot.querySelector(Portal.selector);
    expect(portalEl).not.toBeNull();
    expect(portalEl).toContainElement(content);
    // It must NOT leak into the host document's body.
    expect(document.body.querySelector('[data-testid="shadow-content"]')).toBeNull();
  });

  it('should fall back to document.body when mounted in a detached fragment', () => {
    // A detached DocumentFragment is not a ShadowRoot (it has no `host`), so the portal
    // must fall back to document.body instead of being appended into the off-document fragment.
    const fragment = document.createDocumentFragment();

    render(
      <Portal>
        <div data-testid="fragment-content">Hello fragment</div>
      </Portal>,
      { container: fragment }
    );

    expect(document.body.querySelector('[data-testid="fragment-content"]')).not.toBeNull();
    expect(fragment.querySelector('[data-testid="fragment-content"]')).toBeNull();
  });

  it('should fall back to the shadow root for a top-level appendToParentPortal portal', () => {
    // With no enclosing portal, `appendToParentPortal` must fall back to the same default
    // host as a normal portal — the shadow root — not escape to the host document's body.
    const host = document.createElement('div');
    const shadowRoot = host.attachShadow({ mode: 'open' });
    const container = document.createElement('div');
    shadowRoot.appendChild(container);

    render(
      <Portal appendToParentPortal>
        <div data-testid="append-content">Hello shadow</div>
      </Portal>,
      { container }
    );

    expect(shadowRoot.querySelector('[data-testid="append-content"]')).not.toBeNull();
    expect(document.body.querySelector('[data-testid="append-content"]')).toBeNull();
  });

  it('should not nest into a parent portal from a different document (appendToParentPortal)', () => {
    // React PortalContext propagates through a `createPortal` iframe boundary, so an outer
    // page's portal can become `parentPortal` while this portal mounts in another document.
    // appendToParentPortal must NOT append cross-document; it falls back to the local host.
    const otherDoc = document.implementation.createHTMLDocument('other');
    const foreignParent = otherDoc.createElement('div');
    otherDoc.body.appendChild(foreignParent);

    render(
      <PortalContext.Provider value={foreignParent}>
        <Portal appendToParentPortal>
          <div data-testid="xdoc-content">Hello</div>
        </Portal>
      </PortalContext.Provider>
    );

    // Must NOT be appended into the foreign-document parent; stays in the local document.body.
    expect(foreignParent.querySelector('[data-testid="xdoc-content"]')).toBeNull();
    expect(document.body.querySelector('[data-testid="xdoc-content"]')).not.toBeNull();
  });
});
