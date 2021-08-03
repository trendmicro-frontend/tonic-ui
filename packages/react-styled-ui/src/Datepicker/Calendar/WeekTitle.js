import { Flex } from "@trendmicro/react-styled-ui";
import { DAY } from './constants';

const WeekTitle = () => (
  <>
    {DAY.map((dayName, idx) => (
      <Flex
        height="10x"
        align="center"
        justify="center"
        key={`${dayName}${idx}`}
      >
        {dayName}
      </Flex>
    ))}
  </>
);

export default WeekTitle;
