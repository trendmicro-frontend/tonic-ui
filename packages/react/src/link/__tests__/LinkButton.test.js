import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { LinkButton } from '@tonic-ui/react/src';
import React from 'react';

describe('LinkButton', () => {
  it('should render correctly', async () => {
    const { container } = render(
      <>
        {/* Basic link button */}
        <LinkButton>
          GitHub
        </LinkButton>

        {/* Link button with onClick */}
        <LinkButton onClick={() => {}}>
          Click me
        </LinkButton>

        {/* Link button with text decoration */}
        <LinkButton textDecoration="underline">
          Home
        </LinkButton>

        {/* Disabled link button */}
        <LinkButton disabled>
          Disabled LinkButton
        </LinkButton>
      </>
    );

    expect(container).toMatchSnapshot();
    await testA11y(container);
  });

  it('should handle click events when not disabled', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    
    render(
      <LinkButton onClick={handleClick}>
        Test LinkButton
      </LinkButton>
    );
    
    const button = screen.getByRole('button', { name: /test linkbutton/i });
    await user.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should prevent click events when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    
    render(
      <LinkButton onClick={handleClick} disabled>
        Disabled LinkButton
      </LinkButton>
    );
    
    const button = screen.getByRole('button', { name: /disabled linkbutton/i });
    await user.click(button);
    
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should have correct accessibility attributes when disabled', () => {
    render(
      <LinkButton disabled>
        Disabled LinkButton
      </LinkButton>
    );
    
    const button = screen.getByRole('button', { name: /disabled linkbutton/i });
    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(button).toBeDisabled();
  });

  it('should render as button element', () => {
    render(<LinkButton>Test LinkButton</LinkButton>);
    const button = screen.getByRole('button', { name: /test linkbutton/i });
    expect(button.tagName).toBe('BUTTON');
  });

  it('should forward ref correctly', () => {
    const ref = React.createRef();
    render(
      <LinkButton ref={ref}>
        Test LinkButton
      </LinkButton>
    );
    
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
