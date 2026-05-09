import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { render } from '@tonic-ui/react/test-utils/render';
import { Fade, Tag, TagCloseButton } from '@tonic-ui/react/src';
import { useToggle } from '@tonic-ui/react-hooks/src';
import { callEventHandlers, transitionDuration } from '@tonic-ui/utils/src';

describe('Tag', () => {
  it('should render correctly', async () => {
    const renderOptions = {};
    const { container } = render((
      <>
        <Tag variant="solid">Solid</Tag>
        <Tag variant="outline">Outline</Tag>
        <Tag size="sm">Small</Tag>
        <Tag size="md">Medium</Tag>
        <Tag size="lg">Large</Tag>
        <Tag disabled>Disabled</Tag>
        <Tag error>Error</Tag>
        <Tag isClosable>Closable</Tag>
        <Tag variant="outline" disabled isClosable>Outline Disabled Closable</Tag>
        <Tag variant="outline" error isClosable>Outline Error Closable</Tag>
      </>
    ), renderOptions);

    expect(container).toMatchSnapshot();

    await testA11y(container);
  });

  it('should set aria-disabled when disabled', () => {
    const { getByText } = render(<Tag disabled>Label</Tag>);
    expect(getByText('Label')).toHaveAttribute('aria-disabled', 'true');
  });

  it('should set aria-invalid when error', () => {
    const { getByText } = render(<Tag error>Label</Tag>);
    expect(getByText('Label')).toHaveAttribute('aria-invalid', 'true');
  });

  it('should render a close button when isClosable is true', () => {
    render(<Tag isClosable>Label</Tag>);
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  it('should not render a close button when isClosable is false', () => {
    render(<Tag>Label</Tag>);
    expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    const handleClose = jest.fn();

    render(
      <Tag isClosable onClose={handleClose}>Label</Tag>
    );

    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should disable the close button when tag is disabled', async () => {
    const user = userEvent.setup();
    const handleClose = jest.fn();

    render(
      <Tag disabled isClosable onClose={handleClose}>Label</Tag>
    );

    const closeButton = screen.getByRole('button', { name: 'Close' });
    expect(closeButton).toBeDisabled();

    await user.click(closeButton);
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('should unmount after closing via isClosable', async () => {
    const user = userEvent.setup();
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
            This is a tag
          </Tag>
        </Fade>
      );
    };

    render(<TestComponent onClose={handleClose} />);

    expect(screen.getByTestId('tag')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(handleClose).toHaveBeenCalledTimes(1);

    await waitForElementToBeRemoved(() => screen.getByTestId('tag'), {
      timeout: transitionDuration.leavingScreen + 100, // see "transitions/Fade.js"
    });
  });

  it('should call onClose via TagCloseButton and unmount', async () => {
    const user = userEvent.setup();
    const handleClose = jest.fn();

    const TestComponent = ({ onClose }) => {
      const [isOpen, toggle] = useToggle(true);
      return (
        <Fade in={isOpen} unmountOnExit>
          <Tag
            onClose={callEventHandlers(() => toggle(false), onClose)}
            data-testid="tag"
          >
            This is a tag
            <TagCloseButton />
          </Tag>
        </Fade>
      );
    };

    render(<TestComponent onClose={handleClose} />);

    expect(screen.getByTestId('tag')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(handleClose).toHaveBeenCalledTimes(1);

    await waitForElementToBeRemoved(() => screen.getByTestId('tag'), {
      timeout: transitionDuration.leavingScreen + 100, // see "transitions/Fade.js"
    });
  });

  it('should apply custom backgroundColor and color', () => {
    const { getByText } = render(
      <Tag backgroundColor="#b80003" color="#fcc3c4">Label</Tag>
    );
    expect(getByText('Label')).toHaveStyle('background-color: #b80003; color: #fcc3c4;');
  });
});
