import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { Box, Button, Scrollbar } from '@tonic-ui/react/src';
import { useToggle } from '@tonic-ui/react-hooks/src';
import React, { useCallback, useEffect, useRef } from 'react';

describe('Scrollbar', () => {
  it('should render correctly', async () => {
    const TestComponent = () => (
      <Scrollbar
        height={200}
      >
        <Box height={400}>Scrollable content</Box>
      </Scrollbar>
    );

    const { container } = render(<TestComponent />);

    expect(container.querySelector('[data-scrollbar-track="horizontal"]')).toBeInTheDocument();
    expect(container.querySelector('[data-scrollbar-thumb="horizontal"]')).toBeInTheDocument();
    expect(container.querySelector('[data-scrollbar-track="vertical"]')).toBeInTheDocument();
    expect(container.querySelector('[data-scrollbar-thumb="vertical"]')).toBeInTheDocument();

    expect(container).toMatchSnapshot();

    await testA11y(container);
  });

  it('should scroll to the specificed position using `scrollLeft` and `scrollTop` props', () => {
    const TestComponent = () => {
      const scrollTop = 100;
      const scrollLeft = 100;
      const scrollViewRef = useRef();

      useEffect(() => {
        expect(scrollViewRef.current.scrollLeft).toBe(scrollLeft);
        expect(scrollViewRef.current.scrollTop).toBe(scrollTop);
      }, []);

      return (
        <Scrollbar
          width={200}
          height={200}
          scrollLeft={scrollLeft}
          scrollTop={scrollTop}
          scrollViewRef={scrollViewRef}
        >
          <Box width={400} height={400}>
            Scrollable content
          </Box>
        </Scrollbar>
      );
    };

    render(<TestComponent />);
  });

  it('should restore to the previous scroll position after rerender', async () => {
    const user = userEvent.setup();

    const TestComponent = ({ onUpdate }) => {
      const [on, toggle] = useToggle(true);
      const scrollTopRef = useRef();
      const handleUpdate = useCallback((values) => {
        scrollTopRef.current = values.scrollTop;
        onUpdate(values);
      }, [onUpdate]);

      return (
        <>
          <Button data-testid="btn-toggle" onClick={toggle}>
            Toggle
          </Button>
          {on ? (
            <Scrollbar
              height={200}
              onUpdate={handleUpdate}
              scrollTop={scrollTopRef.current}
            >
              <Box data-testid="scroll-content" height={400}>
                Scrollable content
              </Box>
            </Scrollbar>
          ) : null}
        </>
      );
    };

    const onUpdate = jest.fn();

    const { container } = render(<TestComponent onUpdate={onUpdate} />);

    const getScrollView = () => screen.getByTestId('scroll-content').parentElement;
    const scrollTop = 100;

    // Scroll to the specificed position
    await fireEvent.scroll(getScrollView(), {
      target: {
        scrollTop: scrollTop,
      },
    });
    expect(onUpdate).toHaveBeenCalledWith(expect.objectContaining({ scrollTop: scrollTop }));

    // toggle off
    await user.click(screen.getByTestId('btn-toggle'));
    expect(container.querySelector('[data-scrollbar-track="horizontal"]')).not.toBeInTheDocument();
    expect(container.querySelector('[data-scrollbar-thumb="horizontal"]')).not.toBeInTheDocument();

    // toggle on
    await user.click(screen.getByTestId('btn-toggle')); // on
    expect(container.querySelector('[data-scrollbar-track="horizontal"]')).toBeInTheDocument();
    expect(container.querySelector('[data-scrollbar-thumb="horizontal"]')).toBeInTheDocument();

    // Check if the scroll position is restored
    expect(getScrollView().scrollTop).toBe(scrollTop);
  });
});
