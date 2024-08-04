import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import { transitionDuration } from '@tonic-ui/utils/src';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import {
  Box,
  DatePicker,
  InputAdornment,
  InputControl,
  Text,
  useColorStyle,
} from '@tonic-ui/react/src';
import { CalendarIcon } from '@tonic-ui/react-icons/src';
import * as dateFns from 'date-fns';
import React, { useCallback } from 'react';

describe('DatePicker', () => {
  const TestComponent = (props) => {
    const [colorStyle] = useColorStyle();
    const inputFormat = 'MM/dd/yyyy';
    const onChange = jest.fn();
    const onError = jest.fn();
    const inputError = false;
    const value = new Date('2024-08-01');
    const formatDate = useCallback((date, format) => {
      return dateFns.format(date, format);
    }, []);
    const renderInput = useCallback(({ error, inputProps }) => {
      return (
        <Box>
          <InputControl
            {...inputProps}
            startAdornment={(
              <InputAdornment color={colorStyle.color.secondary}>
                <CalendarIcon />
              </InputAdornment>
            )}
            data-testid="date-picker-input"
            error={inputError}
            placeholder={inputFormat}
          />
          {inputError && (
            <Text mt="1x" color="red:50">Invalid date</Text>
          )}
        </Box>
      );
    }, [colorStyle, inputError, inputFormat]);

    return (
      <DatePicker
        data-testid="date-picker"
        closeOnSelect={false}
        firstDayOfWeek={0}
        formatDate={formatDate}
        onChange={onChange}
        onError={onError}
        value={value}
        inputFormat={inputFormat}
        renderInput={renderInput}
        {...props}
      />
    );
  };

  it('should render correctly', async () => {
    const user = userEvent.setup();
    const renderOptions = {
      useCSSVariables: true,
    };
    const { container } = render((
      <TestComponent />
    ), renderOptions);

    const datePicker = screen.getByTestId('date-picker');
    const datePickerInput = screen.getByTestId('date-picker-input');

    // The date picker and date picker input should be in the document
    expect(datePicker).toBeInTheDocument();
    expect(datePickerInput).toBeInTheDocument();

    // Open the date picker
    await user.click(datePickerInput);

    // The "menu" role should be in the document
    expect(await screen.findByRole('menu')).toBeInTheDocument();

    expect(container).toMatchSnapshot();

    await testA11y(container, {
      axeOptions: {
        rules: {
          // FIXME: Certain ARIA roles must contain particular children (aria-required-children)"
          'aria-required-children': { enabled: false },

          // FIXME: Interactive controls must not be nested (nested-interactive)
          'nested-interactive': { enabled: false },
        },
      },
    });
  });

  it('should close the date picker when a date is selected and closeOnSelect is true', async () => {
    const user = userEvent.setup();
    render(<TestComponent closeOnSelect={true} />);

    const datePickerInput = screen.getByTestId('date-picker-input');

    // Open the date picker
    await user.click(datePickerInput);

    // Select a date
    const dateButton = screen.getByText('15'); // Assuming 15th is a selectable date
    await user.click(dateButton);

    const duration = 100; // Shorten the duration to 100ms for testing
    // The "menu" role should not be in the document
    await waitForElementToBeRemoved(() => screen.getByRole('menu'), {
      // The toast should be removed after the duration plus the transition.
      timeout: duration + transitionDuration.standard + 100, // see "date-pickers/DatePicker/DatePickerContent.js"
    });
  });
});
