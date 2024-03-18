import {
  Box,
  Flex,
  Text,
} from '@tonic-ui/react';
import React from 'react';
import Cell from './Cell';
import {
  BOARD_SIZE,
  CELL_SIZE,
  BLACK_PIECE,
  WHITE_PIECE,
} from './constants';
import { 
  useGameState,
} from './context';
import {
  getReversiblePieces,
  getPlaceableCells,
} from './utils';

const Board = (props) => {
  const { restart, cells, updateCells, turn, nextTurn } = useGameState();
  const opponent = turn === BLACK_PIECE ? WHITE_PIECE : BLACK_PIECE;
  const placeableCells = getPlaceableCells(cells, turn);
  const opponentPlaceableCells = getPlaceableCells(cells, opponent);
  const isGameEnd = placeableCells.length === 0 && opponentPlaceableCells.length === 0;

  return (
    <Box
      sx={{
        width: '80vw',
        height: '80vw',
        maxWidth: BOARD_SIZE * CELL_SIZE,
        maxHeight: BOARD_SIZE * CELL_SIZE,
        backgroundImage: 'linear-gradient(90deg, rgba(0, 0, 0, 0.5) 2.5%, transparent 2.5%), linear-gradient( rgba(0, 0, 0, 0.95) 2.5%, transparent 2.5%)',
        backgroundSize: '12.5% 12.5%',
        backgroundRepeat: 'repeat',
        backgroundColor: 'wheat',
        display: 'grid',
        gridTemplateColumns: 'repeat(8, 12.5%)',
        gridTemplateRows: 'repeat(8, 12.5%)',
        position: 'relative',
      }}
      {...props}
    >
      {isGameEnd && (
        <>
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'black:primary',
              opacity: 0.7,
            }}
          />
          <Flex
            sx={{
              position: 'absolute',
              inset: 0,
              alignItems: 'center',
              justifyContent: 'center',
              userSelect: 'none',
              cursor: 'pointer',
            }}
            onClick={() => {
              restart();
            }}
          >
            <Text
              color="white:primary"
              fontSize={48}
              lineHeight="1"
            >
              GAME OVER
            </Text>
          </Flex>
        </>
      )}
      {cells.map((piece, cellId) => {
        const x = cellId % BOARD_SIZE;
        const y = Math.floor(cellId / BOARD_SIZE);
        const canPlacePiece = !isGameEnd && (turn === BLACK_PIECE) && placeableCells.includes(cellId);
        const handleClick = (e) => {
          if (!canPlacePiece) {
            return;
          }
          const nextCells = [...cells];
          const reversiblePieces = getReversiblePieces(cells, turn, x, y);
          if (reversiblePieces.length > 0) {
            nextCells[cellId] = turn;
            for (let i = 0; i < reversiblePieces.length; ++i) {
              nextCells[reversiblePieces[i]] = turn;
            }
            updateCells(nextCells);
            nextTurn();
          }
        };

        return (
          <Cell
            key={`${x}-${y}`}
            data-coordinate-x={x}
            data-coordinate-y={y}
            piece={piece}
            canPlacePiece={canPlacePiece}
            turn={turn}
            onClick={handleClick}
          />
        );
      })}
    </Box>
  );
};

export default Board;
