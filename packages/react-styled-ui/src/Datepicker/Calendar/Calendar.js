import { 
  useState,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import {
  Flex,
  Grid,
  useColorMode,
  useColorStyle,
} from '@trendmicro/react-styled-ui';
import {
  DAY,
  DEFAULT_WEEK_ROW,
  WEEK_CONFIG,
} from './constants';
import {
  dateToAry,
  dateToObj,
  dateToStr,
  getMonthDays,
  getPrevMonthLastDate,
  isValidDate,
} from './utils';
import Controller from './Controller';
import Week from './Week';
import WeekTitle from './WeekTitle';

const Calendar = ({ startDate: rawDate, onSelect }) => {
  const today = new Date();
  const todayAry = dateToAry(today);
  const initDate = isValidDate(rawDate) ? rawDate : today;
  const [renderDate, setRenderDate] = useState(dateToObj(initDate));
  const [selectedDateStr, setSelectedDateStr] = useState(dateToStr(initDate));
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });

  useEffect(() => {
    if (isValidDate(rawDate)) {
      const formattedDateStr = rawDate.replace(/(-)0(\d{1})/g, "$1$2");
      setRenderDate(dateToObj(rawDate));
      setSelectedDateStr(formattedDateStr);
    }
  }, [rawDate]);

  const getDays = ({ year, month }) => {
    const days = [];
    const daysLength = DEFAULT_WEEK_ROW * DAY.length;
    const curMonthDays = getMonthDays(year, month);
    const curMonthFirstDay = new Date(`${year}-${month}-01`).getDay();

    const prevMonthRemainLength = curMonthFirstDay % 7;
    const prevMonthLastDate = getPrevMonthLastDate(new Date(year, month - 1));
    const [prevYear, prevMonth, prevDate] = dateToAry(prevMonthLastDate);
    const prevMonthFirstRenderDate = prevDate - prevMonthRemainLength + 1;

    let nextMonthRemainLength =
      daysLength - curMonthDays - prevMonthRemainLength;
    nextMonthRemainLength =
      nextMonthRemainLength < 0
        ? nextMonthRemainLength + 7
        : nextMonthRemainLength;
    const [nextYear, nextMonth, nextDate] = dateToAry(new Date(year, month, 1));

    for (let i = 0; i < prevMonthRemainLength; i += 1) {
      days.push({
        year: prevYear,
        month: prevMonth,
        date: i + prevMonthFirstRenderDate
      });
    }

    for (let i = 0; i < curMonthDays; i += 1) {
      days.push({
        year,
        month,
        date: i + 1,
        isToday: todayAry.join("") === `${year}${month}${i + 1}`
      });
    }

    for (let i = 0; i < nextMonthRemainLength; i += 1) {
      days.push({
        year: nextYear,
        month: nextMonth,
        date: i + nextDate
      });
    }
    return days;
  };

  const chageRenderDate = ({ changeYear = 0, changeMonth = 0 }) => {
    setRenderDate(({ year, month, date }) =>
      dateToObj(new Date(year + changeYear, month - 1 + changeMonth, date))
    );
  };

  const onSelectHandler = (dateStr) => {
    setSelectedDateStr(dateStr);
    onSelect(new Date(dateStr));
  };

  return (
    <Flex
      display="inline-flex"
      direction="column"
      px="6x"
      py="3x"
      border="1px solid #C9C9C9"
      boxShadow={colorStyle.shadow.md}
      border-radius="3px"
    >
      <Controller
        chageRenderDate={chageRenderDate}
        renderDate={renderDate}
      />
      <Grid {...WEEK_CONFIG}>
        <WeekTitle />
      </Grid>
      <Grid {...WEEK_CONFIG}>
        <Week
          getDays={getDays}
          renderDate={renderDate}
          selectedDateStr={selectedDateStr}
          onSelectHandler={onSelectHandler}
        />
      </Grid>
    </Flex>
  );
};

Calendar.propTypes = {
  startDate: PropTypes.string,
  onSelect: PropTypes.func
};

Calendar.defaultProps = {
  startDate: "",
  onSelect: () => {}
};

export default Calendar;
