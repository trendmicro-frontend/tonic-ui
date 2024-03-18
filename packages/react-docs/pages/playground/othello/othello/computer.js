import {
  BOARD_SIZE,
  EMPTY_PIECE,
  BLACK_PIECE,
  WHITE_PIECE,
} from './constants';
import {
  getReversiblePieces,
  getPlaceableCells,
} from './utils';

const MAX_DEPTH = 4;

const evaluationTable = (() => {
  const cells = (new Array(BOARD_SIZE**2)).fill(1);
  const toCellId = (x, y) => x + BOARD_SIZE * y;

  // Four corners
  cells[toCellId(0, 0)] = 90;
  cells[toCellId(BOARD_SIZE - 1, 0)] = 90;
  cells[toCellId(0, BOARD_SIZE - 1)] = 90;
  cells[toCellId(BOARD_SIZE - 1, BOARD_SIZE - 1)] = 90;

  // Four edges, excluding adjacent corners
  for (let x = 2; x < BOARD_SIZE - 2; ++x) {
    cells[toCellId(x, 0)] = 10;
    cells[toCellId(x, BOARD_SIZE - 1)] = 10;
  }
  for (let y = 2; y < BOARD_SIZE - 2; ++y) {
    cells[toCellId(0, y)] = 10;
    cells[toCellId(BOARD_SIZE - 1, y)] = 10;
  }

  // Adjacent corners: top-left
  cells[toCellId(0, 1)] = -20;
  cells[toCellId(1, 0)] = -20;
  cells[toCellId(1, 1)] = -20;
  // Adjacent corners: top-right
  cells[toCellId(BOARD_SIZE - 2, 0)] = -20;
  cells[toCellId(BOARD_SIZE - 2, 1)] = -20;
  cells[toCellId(BOARD_SIZE - 1, 1)] = -20;
  // Adjacent corners: bottom-left
  cells[toCellId(0, BOARD_SIZE - 2)] = -20;
  cells[toCellId(1, BOARD_SIZE - 2)] = -20;
  cells[toCellId(1, BOARD_SIZE - 1)] = -20;
  // Adjacent corners: bottom-right
  cells[toCellId(BOARD_SIZE - 2, BOARD_SIZE - 2)] = -20;
  cells[toCellId(BOARD_SIZE - 1, BOARD_SIZE - 2)] = -20;
  cells[toCellId(BOARD_SIZE - 2, BOARD_SIZE - 1)] = -20;

  /*
  for (let i = 0; i < BOARD_SIZE; ++i) {
    console.log('##', cells.slice(BOARD_SIZE * i, BOARD_SIZE * i + BOARD_SIZE));
  }
  */

  return cells;
})();

const evaluate = (cells) => {
  const p1 = getPlaceableCells(cells, BLACK_PIECE);
  const p2 = getPlaceableCells(cells, WHITE_PIECE);

  if (p1.length === 0 && p2.length === 0) {
    // Game End
    const blackPieces = cells.filter(cell => cell === BLACK_PIECE).length;
    const whitePieces = cells.filter(cell => cell === WHITE_PIECE).length;
    return (blackPieces - whitePieces) * 10000;
  }

  let blackScore = 0;
  let whiteScore = 0;
  for (let i = 0; i < cells.length; ++i) {
    if (cells[i] === WHITE_PIECE) {
      whiteScore += evaluationTable[i];
    }
    if (cells[i] === BLACK_PIECE) {
      blackScore += evaluationTable[i];
    }
  }

  // Maximum mobility
  const mobility = p1.length - p2.length;

  const score = (blackScore - whiteScore) + mobility;
  return score;
};

// https://github.com/Jhhhha/Game-Tree
//
// function alphabeta(node, depth, α, β, MinMax) 
//   if depth = 0 or node is left_node
//     return benefit of node
//
//   if MinMax = Max
//     v := -∞
//     foreach child of node
//       v := max(v, alphabeta(child, depth - 1, α, β, FALSE)) 
//       α := max(α, v)
//       if β ≤ α
//         break
//     return v
//   else
//     v := ∞
//     foreach child of node
//       v := min(v, alphabeta(child, depth - 1, α, β, TRUE))
//       β := min(β, v)
//       if β ≤ α
//         break
//     return v
const search = (cells, turn = WHITE_PIECE, depth = 0, maxDepth = MAX_DEPTH, alphaBeta = null) => {
  const opponentTurn = (turn === BLACK_PIECE) ? WHITE_PIECE : BLACK_PIECE;
  const isOddDepth = !!(depth % 2); // Search for maximum value if it's an odd-depth
  let value = isOddDepth ? -Infinity : Infinity;
  const placeableCells = getPlaceableCells(cells, turn);

  if (placeableCells.length === 0) { // No placeable cells
    if (getPlaceableCells(cells, opponentTurn).length === 0) {
      // Game End
      return evaluate(cells);
    }
    return search(cells, opponentTurn, depth + 1, maxDepth, alphaBeta);
  }

  if (depth > maxDepth) {
    // Reached the maximum depth
    return evaluate(cells);
  }

  let computedCellId = -1;

  for (let i = 0; i < placeableCells.length; i++) {
    const cellId = placeableCells[i];
    const x = cellId % 8;
    const y = Math.floor(cellId / 8);
    const reversiblePieces = getReversiblePieces(cells, turn, x, y);
    if (reversiblePieces.length === 0) {
      continue;
    }

    cells[cellId] = turn;
    for (let i = 0; i < reversiblePieces.length; i++) {
      cells[reversiblePieces[i]] = turn;
    }

    const vv = search(cells, opponentTurn, depth + 1, maxDepth, value);

    cells[cellId] = EMPTY_PIECE;
    for (let i = 0; i < reversiblePieces.length; i++) {
      cells[reversiblePieces[i]] = opponentTurn;
    }

    // Find the maximum value for the odd-depth
    if (alphaBeta !== null && isOddDepth && vv >= alphaBeta) {
      // No need to search if the maximum value is already greater than the minimum value of the previous depth
      return vv;
    }

    // Find the minimum value for the even-depth
    if (alphaBeta !== null && !isOddDepth && vv <= alphaBeta) {
      // No need to search if the minimum value is already smaller than the maximum value of the previous depth
      return vv;
    }

    if (isOddDepth) {
      value = Math.max(value, vv);
    } else {
      if (depth === 0 && vv < value) {
        computedCellId = cellId;
      }
      value = Math.min(value, vv);
    }
  }

  if (depth === 0) {
    return computedCellId;
  }

  return value;
};

export {
  search,
};
