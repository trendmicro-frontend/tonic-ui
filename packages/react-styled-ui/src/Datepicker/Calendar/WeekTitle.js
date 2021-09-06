import React from 'react';
import Flex from '../../Flex';
import { DAY } from './constants';

const WeekTitle = () => (
  <>
    {DAY.map(({ id, name }) => (
      <Flex
        height="10x"
        align="center"
        justify="center"
        key={id}
      >
        {name}
      </Flex>
    ))}
  </>
);

export default WeekTitle;
