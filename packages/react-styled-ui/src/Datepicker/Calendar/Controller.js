import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '../../Box';
import Button from '../../Button';
import ButtonBase from '../../ButtonBase';
import Flex from '../../Flex';
import Icon from '../../Icon';

import { MONTH } from './constants';
import { useIconColor } from './styles';

const Controller = ({
  changeRenderDate,
  renderDate,
}) => {
  const [showChangeYear, setShowChangeYear] = useState(false);
  const iconActiveColor = useIconColor({ showChangeYear });

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
          onMouseEnter={() => {
            setShowChangeYear(true);
          }}
          onMouseLeave={() => {
            setShowChangeYear(false);
          }}
        >
          <ButtonBase
            aria-label="change year"
            size="sm"
            type="button"
            variant="ghost"
            width="4x"
            onClick={() => changeRenderDate({ changeYear: 1 })}
            {...iconActiveColor}
          >
            <Icon icon="angle-up" />
          </ButtonBase>
          <ButtonBase
            aria-label="change year"
            size="sm"
            type="button"
            variant="ghost"
            width="4x"
            onClick={() => changeRenderDate({ changeYear: -1 })}
            {...iconActiveColor}
          >
            <Icon icon="angle-down" />
          </ButtonBase>
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
  renderDate: PropTypes.object.isRequired
};

export default Controller;
