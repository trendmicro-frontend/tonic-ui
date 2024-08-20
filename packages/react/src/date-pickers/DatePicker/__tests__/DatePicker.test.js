import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
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
import * as dateFnsLocale from 'date-fns/locale';
import React, { useCallback } from 'react';

describe('DatePicker', () => {
  const TestComponent = ({
    inputFormat = 'yyyy-MM-dd',
    ...rest
  }) => {
    const [colorStyle] = useColorStyle();
    const inputError = false;
    const formatDate = useCallback((date, format) => {
      const options = {
        locale: dateFnsLocale['en-US'],
      };
      return dateFns.format(date, format, options);
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
            data-testid="date-picker-input-control"
            inputProps={{
              'data-testid': 'date-picker-input-element',
            }}
            placeholder={inputFormat}
            error={inputError}
          />
          {inputError ? (<Text mt="1x" color="red:50">Invalid date</Text>) : null}
        </Box>
      );
    }, [colorStyle, inputError, inputFormat]);

    return (
      <DatePicker
        data-testid="date-picker"
        closeOnSelect={false}
        firstDayOfWeek={0}
        formatDate={formatDate}
        inputFormat={inputFormat}
        renderInput={renderInput}
        {...rest}
      />
    );
  };

  it('should render correctly', async () => {
    const user = userEvent.setup();
    const renderOptions = {
      useCSSVariables: true,
    };
    const defaultValue = new Date('2024-08-01');
    const inputFormat = 'yyyy-MM-dd';
    const mockOnChange = jest.fn();
    const { container } = render((
      <TestComponent
        closeOnSelect={true}
        defaultValue={defaultValue}
        inputFormat={inputFormat}
        onChange={mockOnChange}
      />
    ), renderOptions);

    const datePicker = screen.getByTestId('date-picker');
    const datePickerInputControl = screen.getByTestId('date-picker-input-control');
    const datePickerInputElement = screen.getByTestId('date-picker-input-element');

    // The date picker and date picker input should be in the document
    expect(datePicker).toBeInTheDocument();
    expect(datePickerInputControl).toBeInTheDocument();
    expect(datePickerInputElement).toBeInTheDocument();

    // Open the date picker
    await user.click(datePickerInputControl);

    // The "menu" role should be in the document
    expect(await screen.findByRole('menu')).toBeInTheDocument();

    // Select a date
    const dateItem = screen.getByText('15'); // Assuming 15th is a selectable date
    await user.click(dateItem);

    expect(mockOnChange).toHaveBeenCalled();
    expect(datePickerInputElement).toHaveValue('2024-08-15');

    // The "menu" role should not be in the document
    await waitForElementToBeRemoved(() => screen.getByRole('menu'));

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
});
