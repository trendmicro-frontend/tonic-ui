import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Icon,
} from "@trendmicro/react-styled-ui";
import { MONTH } from './constants';

const Controller = ({
  chageRenderDate,
  renderDate,
}) => {
  const [showChangeYear, setShowChangeYear] = useState(false);
  const opacity = showChangeYear ? '1' : '0';

  return (
    <Flex justify="space-between" mb="3x">
      <Button
        variant="ghost"
        type="button"
        aria-label="previous"
        onClick={() => chageRenderDate({ changeMonth: -1 })}
      >
        <Icon icon="angle-left" />
      </Button>
      <Flex align='center'>
        {MONTH[renderDate.month]}
        <Box
          ml='2x'
          style={{ cursor: 'pointer' }}
          onMouseEnter={() => { setShowChangeYear(true) }}
          onMouseLeave={() => { setShowChangeYear(false) }}
        >
          {renderDate.year}
        </Box>
        <Flex
          direction='column'
          style={{ opacity }}
          onMouseEnter={() => { setShowChangeYear(true) }}
          onMouseLeave={() => { setShowChangeYear(false) }}
        >
          <Button
            aria-label="change year"
            size="sm"
            type="button"
            variant="ghost"
            width="16px"
            onClick={() => chageRenderDate({ changeYear: -1 })}
          >
            <Icon icon="angle-up" />
          </Button>
          <Button
            aria-label="change year"
            size="sm"
            type="button"
            variant="ghost"
            width="16px"
            onClick={() => chageRenderDate({ changeYear: 1 })}
          >
            <Icon icon="angle-down" />
          </Button>
        </Flex>
      </Flex>
      <Button
        variant="ghost"
        type="button"
        onClick={() => chageRenderDate({ changeMonth: 1 })}
      >
        <Icon icon="angle-right" />
      </Button>
    </Flex>
  )
};

Controller.propTypes = {
  chageRenderDate: PropTypes.func.isRequired,
  renderDate: PropTypes.object.isRequired,
};

export default Controller;
