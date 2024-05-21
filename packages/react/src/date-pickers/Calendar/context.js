import { createContext } from 'react';

const CalendarContext = createContext();

const CalendarProvider = CalendarContext.Provider;

export {
  CalendarContext,
  CalendarProvider,
};
