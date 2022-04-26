import { createContext } from 'react';

const DatePickerContext = createContext();

const DatePickerProvider = DatePickerContext.Provider;

export {
  DatePickerContext,
  DatePickerProvider,
};
