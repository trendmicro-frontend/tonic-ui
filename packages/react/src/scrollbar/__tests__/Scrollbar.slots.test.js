import { render } from '@tonic-ui/react/test-utils/render';
import { fireEvent } from '@testing-library/react';
import { Box, Scrollbar } from '@tonic-ui/react/src';
import { warnDeprecatedProps } from '@tonic-ui/utils';
import React from 'react';

jest.mock('@tonic-ui/utils', () => ({
  ...jest.requireActual('@tonic-ui/utils'),
  warnDeprecatedProps: jest.fn(),
}));

const CustomScrollView = React.forwardRef(({ children, ...rest }, ref) => (
  <Box ref={ref} data-testid="custom-scroll-view" {...rest}>{children}</Box>
));
CustomScrollView.displayName = 'CustomScrollView';

const CustomRoot = React.forwardRef(({ children, ...rest }, ref) => (
  <Box ref={ref} data-testid="custom-root" {...rest}>{children}</Box>
));
CustomRoot.displayName = 'CustomRoot';

const CustomHorizontalTrack = React.forwardRef(({ children, ...rest }, ref) => (
  <Box ref={ref} data-testid="custom-h-track" {...rest}>{children}</Box>
));
CustomHorizontalTrack.displayName = 'CustomHorizontalTrack';

const CustomVerticalTrack = React.forwardRef(({ children, ...rest }, ref) => (
  <Box ref={ref} data-testid="custom-v-track" {...rest}>{children}</Box>
));
CustomVerticalTrack.displayName = 'CustomVerticalTrack';

const CustomHorizontalThumb = React.forwardRef(({ children, ...rest }, ref) => (
  <Box ref={ref} data-testid="custom-h-thumb" {...rest}>{children}</Box>
));
CustomHorizontalThumb.displayName = 'CustomHorizontalThumb';

const CustomVerticalThumb = React.forwardRef(({ children, ...rest }, ref) => (
  <Box ref={ref} data-testid="custom-v-thumb" {...rest}>{children}</Box>
));
CustomVerticalThumb.displayName = 'CustomVerticalThumb';

describe('Scrollbar slots / slotProps', () => {
  beforeEach(() => {
    warnDeprecatedProps.mockClear();
  });

  it('slots.scrollView renders the custom scroll-view element (default mode)', () => {
    const { getByTestId } = render(
      <Scrollbar height={200} slots={{ scrollView: CustomScrollView }}>
        <Box height={400}>content</Box>
      </Scrollbar>
    );

    const scrollView = getByTestId('custom-scroll-view');
    expect(scrollView).toBeInTheDocument();
    expect(scrollView).toHaveTextContent('content');
  });

  it('slots.root renders the custom root element', () => {
    const { getByTestId } = render(
      <Scrollbar height={200} slots={{ root: CustomRoot }}>
        <Box height={400}>content</Box>
      </Scrollbar>
    );

    const root = getByTestId('custom-root');
    expect(root).toBeInTheDocument();
    expect(root).toHaveAttribute('data-tonic', 'Scrollbar');
  });

  it('slotProps.root passes additional props to the root container', () => {
    const { getByText } = render(
      <Scrollbar height={200} slotProps={{ root: { 'data-foo': 'bar' } }}>
        <Box height={400}>content</Box>
      </Scrollbar>
    );

    const root = getByText('content').closest('[data-tonic="Scrollbar"]');
    expect(root).toHaveAttribute('data-foo', 'bar');
  });

  it('slotProps.scrollView passes additional props to the scroll view', () => {
    const { getByText } = render(
      <Scrollbar height={200} slotProps={{ scrollView: { 'data-foo': 'bar' } }}>
        <Box height={400}>content</Box>
      </Scrollbar>
    );

    // The scroll view is the parent of the content.
    const scrollView = getByText('content').parentElement;
    expect(scrollView).toHaveAttribute('data-foo', 'bar');
  });

  it('slotProps.scrollView.ref forwards a ref to the scroll view element', () => {
    const ref = React.createRef();
    const { getByText } = render(
      <Scrollbar height={200} slotProps={{ scrollView: { ref } }}>
        <Box height={400}>content</Box>
      </Scrollbar>
    );

    expect(ref.current).toBe(getByText('content').parentElement);
  });

  it('deprecated scrollViewProps still applies and warns', () => {
    const { getByText } = render(
      <Scrollbar height={200} scrollViewProps={{ 'data-foo': 'bar' }}>
        <Box height={400}>content</Box>
      </Scrollbar>
    );

    expect(getByText('content').parentElement).toHaveAttribute('data-foo', 'bar');
    expect(warnDeprecatedProps).toHaveBeenCalledWith('scrollViewProps', {
      prefix: 'Scrollbar:',
      alternative: 'slotProps.scrollView',
      willRemove: true,
    });
  });

  it('deprecated scrollViewRef still forwards and warns', () => {
    const ref = React.createRef();
    const { getByText } = render(
      <Scrollbar height={200} scrollViewRef={ref}>
        <Box height={400}>content</Box>
      </Scrollbar>
    );

    expect(ref.current).toBe(getByText('content').parentElement);
    expect(warnDeprecatedProps).toHaveBeenCalledWith('scrollViewRef', {
      prefix: 'Scrollbar:',
      alternative: 'slotProps.scrollView.ref',
      willRemove: true,
    });
  });
});

describe('Scrollbar track/thumb slots', () => {
  it('slots.horizontalTrack renders the custom element (default mode)', () => {
    const { getByTestId } = render(
      <Scrollbar height={200} slots={{ horizontalTrack: CustomHorizontalTrack }}>
        <Box height={400} width={800}>content</Box>
      </Scrollbar>
    );
    expect(getByTestId('custom-h-track')).toBeInTheDocument();
  });

  it('slotProps.horizontalTrack passes additional props to the horizontal track', () => {
    const { container } = render(
      <Scrollbar height={200} slotProps={{ horizontalTrack: { 'data-foo': 'bar' } }}>
        <Box height={400}>content</Box>
      </Scrollbar>
    );
    expect(container.querySelector('[data-scrollbar-track="horizontal"]'))
      .toHaveAttribute('data-foo', 'bar');
  });

  it('slotProps.horizontalTrack.ref forwards a ref to the horizontal track element', () => {
    const ref = React.createRef();
    const { container } = render(
      <Scrollbar height={200} slotProps={{ horizontalTrack: { ref } }}>
        <Box height={400}>content</Box>
      </Scrollbar>
    );
    expect(ref.current).toBe(container.querySelector('[data-scrollbar-track="horizontal"]'));
  });

  it('slotProps.horizontalTrack.onMouseDown is chained, not replaced', () => {
    const onMouseDown = jest.fn();
    const { container } = render(
      <Scrollbar height={200} slotProps={{ horizontalTrack: { onMouseDown } }}>
        <Box height={400}>content</Box>
      </Scrollbar>
    );
    fireEvent.mouseDown(container.querySelector('[data-scrollbar-track="horizontal"]'));
    expect(onMouseDown).toHaveBeenCalledTimes(1); // consumer handler still fires; drag handler also wired
  });

  it('slots.verticalTrack / slotProps.verticalTrack work', () => {
    const { getByTestId } = render(
      <Scrollbar
        height={200}
        slots={{ verticalTrack: CustomVerticalTrack }}
        slotProps={{ verticalTrack: { 'data-foo': 'bar' } }}
      >
        <Box height={400}>content</Box>
      </Scrollbar>
    );
    expect(getByTestId('custom-v-track')).toHaveAttribute('data-foo', 'bar');
  });

  it('slots.horizontalThumb / slotProps.horizontalThumb work', () => {
    const { getByTestId } = render(
      <Scrollbar
        height={200}
        slots={{ horizontalThumb: CustomHorizontalThumb }}
        slotProps={{ horizontalThumb: { 'data-foo': 'bar' } }}
      >
        <Box height={400} width={800}>content</Box>
      </Scrollbar>
    );
    expect(getByTestId('custom-h-thumb')).toHaveAttribute('data-foo', 'bar');
  });

  it('slots.verticalThumb / slotProps.verticalThumb work', () => {
    const { getByTestId } = render(
      <Scrollbar
        height={200}
        slots={{ verticalThumb: CustomVerticalThumb }}
        slotProps={{ verticalThumb: { 'data-foo': 'bar' } }}
      >
        <Box height={400}>content</Box>
      </Scrollbar>
    );
    expect(getByTestId('custom-v-thumb')).toHaveAttribute('data-foo', 'bar');
  });
});
