import { screen } from '@testing-library/react';
import { render } from '@tonic-ui/react/test-utils/render';
import React from 'react';
import { renderComponentOrValue } from '../renderComponentOrValue';

class ReactClassComponent extends React.Component {
  render() {
    return (
      <div>{this.props.message}</div>
    );
  }
}

const ReactFunctionalComponent = ({ message }) => <div>{message}</div>;

describe('renderComponentOrValue', () => {
  it('renders a functional component with props', () => {
    render(renderComponentOrValue(ReactFunctionalComponent, { message: 'Hello, World!' }));
    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
  });

  it('renders a class component with props', () => {
    render(renderComponentOrValue(ReactClassComponent, { message: 'Hello, World!' }));
    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
  });

  it('returns a non-component value directly', () => {
    const { container } = render(renderComponentOrValue('Hello, World!', {}));
    expect(container.textContent).toBe('Hello, World!');
  });

  it('returns null if the value is null', () => {
    const { container } = render(renderComponentOrValue(null, {}));
    expect(container.textContent).toBe('');
  });

  it('returns undefined if the value is undefined', () => {
    const { container } = render(renderComponentOrValue(undefined, {}));
    expect(container.textContent).toBe('');
  });
});
