import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
//import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
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
    const value = new Date();
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
        closeOnSelect={true}
        firstDayOfWeek={0}
        formatDate={formatDate}
        onChange={onChange}
        onError={onError}
        value={value}
        inputFormat={inputFormat}
        renderInput={renderInput}
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

    /* FIXME
    await testA11y(container, {
      axeOptions: {
        rules: {
        },
      },
    });
    */
  });
});
