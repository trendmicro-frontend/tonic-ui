import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import { Fade, Tag } from '@tonic-ui/react/src';
import { useToggle } from '@tonic-ui/react-hooks/src';
import { callEventHandlers, transitionDuration } from '@tonic-ui/utils/src';
import React from 'react';

describe('Tag', () => {
  it('should render correctly', async () => {
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
      <Tag backgroundColor="#b80003" color="#fcc3c4">Test Tag</Tag>
    );

    expect(getByText('Test Tag')).toHaveStyle('background-color: #b80003; color: #fcc3c4;');
  });
});
