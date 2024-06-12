import {
  Box,
  Flex,
  Text,
} from '@tonic-ui/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  BOARD_SIZE,
  CELL_SIZE,
  EMPTY_PIECE,
  BLACK_PIECE,
  WHITE_PIECE,
} from './constants';
import {
  GameStateContext,
} from './context';
import {
  getReversiblePieces,
} from './utils';
import Board from './Board';
import { search } from './computer';

const Othello = () => {
  const [turn, setTurn] = useState(BLACK_PIECE);
  const [cells, updateCells] = useState((new Array(BOARD_SIZE**2)).fill(EMPTY_PIECE));
  const nextTurn = useCallback(() => {
    setTurn(turn === WHITE_PIECE ? BLACK_PIECE : WHITE_PIECE);
  }, [turn]);
  const restart = useCallback(() => {
    const nextCells = (new Array(BOARD_SIZE**2)).fill(EMPTY_PIECE);
    nextCells[BOARD_SIZE * 3 + 3] = WHITE_PIECE;
    nextCells[BOARD_SIZE * 3 + 4] = BLACK_PIECE;
    nextCells[BOARD_SIZE * 4 + 3] = BLACK_PIECE;
    nextCells[BOARD_SIZE * 4 + 4] = WHITE_PIECE;
    updateCells(nextCells);
    setTurn(BLACK_PIECE);
  }, []);
  const context = useMemo(() => ({
    cells,
    updateCells,
    turn,
    nextTurn,
    restart,
  }), [cells, updateCells, turn, nextTurn, restart]);

  // Game Start
  useEffect(() => {
    restart();
  }, [restart]);

  // Computer Move
  useEffect(() => {
    if (turn !== WHITE_PIECE) {
      return;
    }

    requestAnimationFrame(() => {
      const nextCells = [...cells];
      const cellId = search(nextCells, turn);
      const x = cellId % 8;
      const y = Math.floor(cellId / 8);
      const reversiblePieces = getReversiblePieces(cells, turn, x, y);
      if (reversiblePieces.length > 0) {
        nextCells[cellId] = turn;
        for (let i = 0; i < reversiblePieces.length; ++i) {
          nextCells[reversiblePieces[i]] = turn;
        }
        updateCells(nextCells);
        nextTurn();
      }
    });
  }, [turn, nextTurn, cells, updateCells]);

  return (
    <GameStateContext.Provider value={context}>
      <Box
        sx={{
          width: '80vw',
          maxWidth: BOARD_SIZE * CELL_SIZE,
          mb: '4x',
        }}
      >
        <Flex alignItems="center" justifyContent="space-between">
          <Text fontSize="xl" lineHeight="xl">
            White: {cells.reduce((acc, piece) => piece === WHITE_PIECE ? acc + 1 : acc, 0)}
          </Text>
          <Text fontSize="xl" lineHeight="xl">
            Black: {cells.reduce((acc, piece) => piece === BLACK_PIECE ? acc + 1 : acc, 0)}
          </Text>
        </Flex>
      </Box>
      <Board />
    </GameStateContext.Provider>
  );
};

export default Othello;
