import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  Flex,
  useColorMode,
} from '@trendmicro/react-styled-ui';
import {
  DAY_BACKGROUND_COLOR,
  DAY_FONT_COLOR,
  THEME_MODE,
} from './constants';

export const calculateDayBackgroundColor = ({
  colorMode = THEME_MODE.LIGHT,
  isSelected = false,
  isHover = false,
}) => {
  if (isSelected) {
    return DAY_BACKGROUND_COLOR[colorMode].SELECTED
  } else if (!isSelected && isHover) {
    return DAY_BACKGROUND_COLOR[colorMode].HOVERED;
  }
  return DAY_BACKGROUND_COLOR[colorMode].DEFAULT
};

const Day = ({
  date,
  dateInfoStr,
  isSelected,
  onSelectHandler,
}) => {
  const [isHover, setHoverState] = useState(false);
  const [colorMode] = useColorMode();

  return (
    <Flex
      align="center"
      backgroundColor={calculateDayBackgroundColor({ colorMode, isHover, isSelected })}
      color={DAY_FONT_COLOR[colorMode][isSelected]}
      cursor="pointer"
      height="10x"
      justify="center"
      onClick={() => onSelectHandler(dateInfoStr)}
      onMouseEnter={() => { setHoverState(true) }}
      onMouseLeave={() => { setHoverState(false) }}
    >
      {date}
    </Flex>
  )
}
  ;

Day.propTypes = {
  date: PropTypes.number.isRequired,
  dateInfoStr: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelectHandler: PropTypes.func.isRequired,
};

export default Day;
