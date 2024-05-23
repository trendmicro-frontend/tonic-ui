import { DatePicker, InputAdornment, InputControl, TextLabel, useColorMode, useColorStyle } from '@tonic-ui/react';
import { CalendarIcon } from '@tonic-ui/react-icons';
import React, { forwardRef } from 'react';

const DateInput = forwardRef((props, ref) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });

  return (
    <InputControl
      ref={ref}
      startAdornment={(
        <InputAdornment color={colorStyle.color.secondary}>
          <CalendarIcon />
        </InputAdornment>
      )}
      {...props}
    />
  );
});
DateInput.displayName = 'DateInput';

const App = () => (
  <>
    <TextLabel mb="1x">Date Picker</TextLabel>
    <DatePicker
      defaultValue={new Date()}
      inputFormat="yyyy-MM-dd"
      renderInput={({ error, inputProps }) => {
        const _error = !!inputProps.value && error;

        return (
          <DateInput
            {...inputProps}
            error={_error}
            placeholder="yyyy-MM-dd"
          />
        );
      }}
    />
  </>
);

export default App;
