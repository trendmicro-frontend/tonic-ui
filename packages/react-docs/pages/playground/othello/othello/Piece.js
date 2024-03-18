import {
  Box,
} from '@tonic-ui/react';
import React from 'react';
import { BLACK_PIECE, WHITE_PIECE } from './constants';

const Piece = ({ value }) => {
  const backgroundColorMap = {
    [BLACK_PIECE]: 'black:primary',
    [WHITE_PIECE]: 'white:primary',
  };

  return (
    <Box
      sx={{
        borderRadius: '50%',
        backgroundColor: backgroundColorMap[value],
        height: '100%',
        width: '100%',
      }}
    />
  );
};

export default Piece;
