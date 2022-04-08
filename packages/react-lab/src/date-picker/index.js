import DatePicker from './DatePicker';
import DatePickerPopper from './DatePickerPopper';
import DatePickerToggle from './DatePickerToggle';
import Calendar from './Calendar';
import DateInput from './DateInput';
import TimeInput from './TimeInput';

DatePicker.Calendar = Calendar;
DatePicker.DateInput = DateInput;
DatePicker.Popper = DatePickerPopper;
DatePicker.Toggle = DatePickerToggle;

export {
  Calendar,
  DateInput,
  DatePicker,
  DatePickerPopper,
  DatePickerToggle,
  TimeInput,
};

export default DatePicker;
