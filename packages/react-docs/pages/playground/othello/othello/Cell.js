import {
  Box,
} from '@tonic-ui/react';
import React from 'react';
import Piece from './Piece';

const Cell = ({
  piece,
  canPlacePiece,
  turn,
  ...rest
}) => {
  if (canPlacePiece) {
    return (
      <Box
        sx={{
          p: '1x',
          cursor: 'pointer',
          opacity: 0.1,
          _hover: {
            opacity: 1,
          }
        }}
        {...rest}
      >
        <Piece value={turn} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: '1x',
      }}
      {...rest}
    >
      <Piece value={piece} />
    </Box>
  );
};

export default Cell;
