import { BOARD_SIZE, EMPTY_PIECE } from './constants';

export const getPiece = (cells, x, y) => cells[x + BOARD_SIZE * y];

export const getReversiblePieces = (cells, turn, x, y) => {
  const piece = getPiece(cells, x, y);
  if (piece !== EMPTY_PIECE) {
    return [];
  }

  const reversiblePieces = [];
  const opponentPieces = [];
  const checkCell = (x, y) => {
    const piece = getPiece(cells, x, y);
    if (piece === EMPTY_PIECE) {
      return false;
    }
    if (piece !== turn) {
      opponentPieces.push(x + BOARD_SIZE * y);
      return true;
    }
    if (piece === turn) {
      reversiblePieces.push(...opponentPieces);
      return false;
    }
    return true;
  };

  // to left
  opponentPieces.length = 0;
  for (let i = x - 1; i >= 0; i--) {
    if (checkCell(i, y) === false) {
      break;
    }
  }

  // to right
  opponentPieces.length = 0;
  for (let i = x + 1; i < 8; i++) {
    if (checkCell(i, y) === false) {
      break;
    }
  }

  // to top
  opponentPieces.length = 0;
  for (let i = y - 1; i >= 0; i--) {
    if (checkCell(x, i) === false) {
      break;
    }
  }

  // to bottom
  opponentPieces.length = 0;
  for (let i = y + 1; i < 8; i++) {
    if (checkCell(x, i) === false) {
      break;
    }
  }

  // to upper left
  opponentPieces.length = 0;
  for (let i = x - 1, j = y - 1; i >= 0 && j >= 0; i--, j--) {
    if (checkCell(i, j) === false) {
      break;
    }
  }

  // to upper right
  opponentPieces.length = 0;
  for (let i = x + 1, j = y - 1; i < 8 && j >= 0; i++, j--) {
    if (checkCell(i, j) === false) {
      break;
    }
  }

  // to bottom right
  opponentPieces.length = 0;
  for (let i = x + 1, j = y + 1; i < 8 && j < 8; i++, j++) {
    if (checkCell(i, j) === false) {
      break;
    }
  }

  // to bottom left
  opponentPieces.length = 0;
  for (let i = x - 1, j = y + 1; i >= 0 && j < 8; i--, j++) {
    if (checkCell(i, j) === false) {
      break;
    }
  }

  return reversiblePieces;
};

export const getPlaceableCells = (cells, turn) => {
  const placeableCells = [];
  for (let i = 0; i < BOARD_SIZE**2; i++) {
    const x = i % BOARD_SIZE;
    const y = Math.floor(i / BOARD_SIZE);
    const reversiblePieces = getReversiblePieces(cells, turn, x, y);
    if (reversiblePieces.length > 0) {
      placeableCells.push(i);
    }
  }
  return placeableCells;
};
