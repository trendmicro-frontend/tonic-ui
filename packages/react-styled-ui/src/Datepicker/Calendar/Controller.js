import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '../../Box';
import Button from '../../Button';
import Flex from '../../Flex';
import Icon from '../../Icon';

import { MONTH } from './constants';

const Controller = ({
  changeRenderDate,
  renderDate,
}) => {
  const [showChangeYear, setShowChangeYear] = useState(false);
  const opacity = showChangeYear ? '1' : '0';

  return (
    <Flex justify="space-between" align="center">
      <Button
        variant="ghost"
        type="button"
        aria-label="previous"
        width="8x"
        onClick={() => changeRenderDate({ changeMonth: -1 })}
      >
        <Icon icon="angle-left" />
      </Button>
      <Flex align="center" fontSize="md" transform="translateX(16px)">
        {MONTH[renderDate.month]}
        <Box
          px="2x"
          cursor="pointer"
          onMouseEnter={() => {
            setShowChangeYear(true);
          }}
          onMouseLeave={() => {
            setShowChangeYear(false);
          }}
        >
          {renderDate.year}
        </Box>
        <Flex
          direction="column"
          style={{ opacity }}
          onMouseEnter={() => {
            setShowChangeYear(true);
          }}
          onMouseLeave={() => {
            setShowChangeYear(false);
          }}
        >
          <Button
            aria-label="change year"
            size="sm"
            type="button"
            variant="ghost"
            width="4x"
            onClick={() => changeRenderDate({ changeYear: -1 })}
          >
            <Icon icon="angle-up" />
          </Button>
          <Button
            aria-label="change year"
            size="sm"
            type="button"
            variant="ghost"
            width="4x"
            onClick={() => changeRenderDate({ changeYear: 1 })}
          >
            <Icon icon="angle-down" />
          </Button>
        </Flex>
      </Flex>
      <Button
        variant="ghost"
        type="button"
        width="8x"
        onClick={() => changeRenderDate({ changeMonth: 1 })}
      >
        <Icon icon="angle-right" />
      </Button>
    </Flex>
  );
};

Controller.propTypes = {
  changeRenderDate: PropTypes.func.isRequired,
  renderDate: PropTypes.object.isRequired,
};

export default Controller;
