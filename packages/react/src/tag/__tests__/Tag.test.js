import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import { Fade, Tag } from '@tonic-ui/react/src';
import { useToggle } from '@tonic-ui/react-hooks';
import { callEventHandlers, transitionDuration } from '@tonic-ui/utils';
import React from 'react';

describe('Tag', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Tag>Tag</Tag>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render correctly with interactions', async () => {
    const user = userEvent.setup();
    const message = 'This is a tag';
    const handleClose = jest.fn();

    const TestComponent = ({ onClose }) => {
      const [isOpen, toggle] = useToggle(true);
      return (
        <Fade in={isOpen} unmountOnExit>
          <Tag
            isClosable
            onClose={callEventHandlers(() => toggle(false), onClose)}
            data-testid="tag"
          >
            {message}
          </Tag>
        </Fade>
      );
    };

    render(<TestComponent onClose={handleClose} />);

    const tagElement = screen.getByTestId('tag');
    expect(tagElement).toBeInTheDocument();
    expect(tagElement).toHaveTextContent(message);

    const closeButton = screen.getByRole('button');
    await user.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);

    await waitForElementToBeRemoved(() => screen.getByTestId('tag'), {
      timeout: transitionDuration.leavingScreen + 100, // see "transitions/Fade.js"
    });
  });

  it('will change tag color', () => {
    const { getByText } = render(
      <Tag backgroundColor="#b80003" color="#fcc3c4" _hover={{ backgroundColor: '#b80003' }}>Test Tag</Tag>
    );

    expect(getByText('Test Tag')).toHaveStyle('background-color: rgb(184, 0, 3); color: rgb(252, 195, 196);');
  });

  it('should render with different sizes', () => {
    const { rerender, container } = render(<Tag size="sm">Small Tag</Tag>);
    expect(container.firstChild).toMatchSnapshot();

    rerender(<Tag size="md">Medium Tag</Tag>);
    expect(container.firstChild).toMatchSnapshot();

    rerender(<Tag size="lg">Large Tag</Tag>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render with different variants', () => {
    const { rerender, container } = render(<Tag variant="solid">Solid Tag</Tag>);
    expect(container.firstChild).toMatchSnapshot();

    rerender(<Tag variant="outline">Outline Tag</Tag>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render with disabled state', () => {
    const { container } = render(<Tag disabled>Disabled Tag</Tag>);
    expect(container.firstChild).toHaveAttribute('aria-disabled', 'true');
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render with error state', () => {
    const { container } = render(<Tag error>Error Tag</Tag>);
    expect(container.firstChild).toHaveAttribute('aria-invalid', 'true');
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render as a function child', () => {
    const { getByText } = render(
      <Tag size="md" variant="solid">
        {({ size, variant }) => `Tag: ${size} - ${variant}`}
      </Tag>
    );
    expect(getByText('Tag: md - solid')).toBeInTheDocument();
  });

  it('should render with isClosable but without onClose handler', () => {
    const { container } = render(<Tag isClosable>Closable Tag</Tag>);
    const closeButton = screen.getByRole('button');
    expect(closeButton).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should combine size, variant, and isClosable', () => {
    const { container } = render(
      <Tag size="lg" variant="outline" isClosable>
        Combined Tag
      </Tag>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
