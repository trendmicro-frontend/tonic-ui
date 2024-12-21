import { createContext } from 'react';

const DateCalendarContext = createContext();

const DateCalendarProvider = DateCalendarContext.Provider;

export {
  DateCalendarContext,
  DateCalendarProvider,
};
