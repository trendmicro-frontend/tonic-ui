import { screen, waitFor } from '@testing-library/react';
import { render } from '@tonic-ui/react/test-utils/render';
import { Box } from '@tonic-ui/react/src';
import DatePickerContent from '@tonic-ui/react/src/date-pickers/DatePicker/DatePickerContent';
import { DatePickerProvider } from '@tonic-ui/react/src/date-pickers/DatePicker/context';
import { warnDeprecatedProps } from '@tonic-ui/utils';
import React, { useRef } from 'react';

jest.mock('@tonic-ui/utils', () => ({
  ...jest.requireActual('@tonic-ui/utils'),
  warnDeprecatedProps: jest.fn(),
}));

const CustomTransition = React.forwardRef(({ in: _in, children, ...rest }, ref) => (
  <Box ref={ref} data-testid="custom-transition" {...rest}>{children}</Box>
));
CustomTransition.displayName = 'CustomTransition';

const CustomPopper = React.forwardRef(({ children, ...rest }, ref) => (
  <Box ref={ref} data-testid="custom-popper" {...rest}>
    {typeof children === 'function'
      ? children({ placement: 'bottom', transition: { in: true, onEnter: () => {}, onExited: () => {} } })
      : children}
  </Box>
));
CustomPopper.displayName = 'CustomPopper';

// Wrapper that provides the minimal DatePicker context needed for DatePickerContent to render open
const DatePickerContentWrapper = ({ children }) => {
  const datePickerContentRef = useRef(null);
  const datePickerToggleRef = useRef(null);

  const context = {
    isOpen: true,
    offset: [0, 0],
    onClose: jest.fn(),
    placement: 'bottom-start',
    datePickerContentId: 'test-date-picker-content',
    datePickerContentRef,
    datePickerToggleId: 'test-date-picker-toggle',
    datePickerToggleRef,
  };

  return (
    <DatePickerProvider value={context}>
      {children}
    </DatePickerProvider>
  );
};

// Helper: render DatePickerContent in its open state with optional slot props
const renderOpenDatePickerContent = (datePickerContentProps = {}) => {
  return render(
    <DatePickerContentWrapper>
      <DatePickerContent {...datePickerContentProps}>
        <Box data-testid="date-picker-body">calendar content</Box>
      </DatePickerContent>
    </DatePickerContentWrapper>
  );
};

describe('DatePickerContent slots / slotProps', () => {
  beforeEach(() => {
    warnDeprecatedProps.mockClear();
  });

  describe('Transition slot', () => {
    it('A — slots.transition renders the custom transition component', async () => {
      renderOpenDatePickerContent({ slots: { transition: CustomTransition } });

      await waitFor(() => {
        expect(screen.getByTestId('custom-transition')).toBeInTheDocument();
      });
    });

    it('B — slotProps.transition passes additional props to the transition element', async () => {
      renderOpenDatePickerContent({
        slots: { transition: CustomTransition },
        slotProps: { transition: { 'data-foo': 'bar' } },
      });

      await waitFor(() => {
        expect(screen.getByTestId('custom-transition')).toHaveAttribute('data-foo', 'bar');
      });
    });

    it('C — deprecated TransitionComponent still renders and warns; deprecated TransitionProps warns', async () => {
      renderOpenDatePickerContent({
        TransitionComponent: CustomTransition,
        TransitionProps: {},
      });

      await waitFor(() => {
        expect(screen.getByTestId('custom-transition')).toBeInTheDocument();
      });

      expect(warnDeprecatedProps).toHaveBeenCalledWith('TransitionComponent', {
        prefix: 'DatePickerContent:',
        alternative: 'slots.transition',
        willRemove: true,
      });
      expect(warnDeprecatedProps).toHaveBeenCalledWith('TransitionProps', {
        prefix: 'DatePickerContent:',
        alternative: 'slotProps.transition',
        willRemove: true,
      });
    });
  });

  describe('Popper slot', () => {
    it('A — slots.popper renders the custom popper component', async () => {
      renderOpenDatePickerContent({ slots: { popper: CustomPopper } });

      await waitFor(() => {
        expect(screen.getByTestId('custom-popper')).toBeInTheDocument();
      });
    });

    it('B — slotProps.popper forwards additional props to the popper element', async () => {
      renderOpenDatePickerContent({
        slots: { popper: CustomPopper },
        slotProps: { popper: { 'data-foo': 'bar' } },
      });

      await waitFor(() => {
        expect(screen.getByTestId('custom-popper')).toHaveAttribute('data-foo', 'bar');
      });
    });

    it('C — deprecated PopperComponent still renders and warns; deprecated PopperProps warns', async () => {
      renderOpenDatePickerContent({
        PopperComponent: CustomPopper,
        PopperProps: {},
      });

      await waitFor(() => {
        expect(screen.getByTestId('custom-popper')).toBeInTheDocument();
      });

      expect(warnDeprecatedProps).toHaveBeenCalledWith('PopperComponent', {
        prefix: 'DatePickerContent:',
        alternative: 'slots.popper',
        willRemove: true,
      });
      expect(warnDeprecatedProps).toHaveBeenCalledWith('PopperProps', {
        prefix: 'DatePickerContent:',
        alternative: 'slotProps.popper',
        willRemove: true,
      });
    });
  });
});
