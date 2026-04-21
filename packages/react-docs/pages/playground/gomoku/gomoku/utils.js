import {
  BOARD_SIZE,
  PLAYER_NONE,
  PLAYER_HUMAN,
  PLAYER_AI,
} from './constants';

const directions = [
  [1, 0], // Horizontal (rightwards)
  [0, 1], // Vertical (downwards)
  [1, 1], // Diagonal
  [1, -1], // Diagonal
];

const isBoardFull = (board) => {
  return board.every(row => row.every(cell => cell !== PLAYER_NONE));
};

const isValidPosition = (x, y) => {
  return x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE;
};

const evaluatePoint = (board, x, y, player) => {
  let total = 0;
  const opponent = player === PLAYER_HUMAN ? PLAYER_AI : PLAYER_HUMAN;
  for (let [dx, dy] of directions) {
    let count = 1;
    let block = 0;
    for (let step = 1; step < 5; step++) {
      const cx = x + dx * step;
      const cy = y + dy * step;
      if (!isValidPosition(cx, cy)) {
        block++;
        break;
      } else if (board[cx][cy] === opponent) {
        block++;
        break;
      } else if (board[cx][cy] === player) {
        count++;
      } else {
        break;
      }
    }
    for (let step = 1; step < 5; step++) {
      const cx = x - dx * step;
      const cy = y - dy * step;
      if ((cx < 0 || cx >= BOARD_SIZE) || (cy < 0 || cy >= BOARD_SIZE)) {
        block++;
        break;
      } else if (board[cx][cy] === opponent) {
        block++;
        break;
      } else if (board[cx][cy] === player) {
        count++;
      } else {
        break;
      }
    }

    if (count >= 5) {
      total += 10000;
    } else if (count === 4) {
      total += block === 0 ? 1000 : 100;
    } else if (count === 3) {
      total += block === 0 ? 100 : 10;
    } else if (count === 2) {
      total += 10;
    }
  }
  return total;
};

const checkWin = (board, player, x, y) => {
  for (const [dx, dy] of directions) {
    let count = 1;

    // Check in one direction
    let cx = x + dx;
    let cy = y + dy;
    while (isValidPosition(cx, cy) && board[cx][cy] === player) {
      count++;
      cx += dx;
      cy += dy;
    }

    // Check in the opposite direction
    cx = x - dx;
    cy = y - dy;
    while (isValidPosition(cx, cy) && board[cx][cy] === player) {
      count++;
      cx -= dx;
      cy -= dy;
    }

    if (count >= 5) {
      return true;
    }
  }

  return false;
};

const computeAIMove = (board) => {
  let bestScore = -Infinity;
  let move = null;
  for (let x = 0; x < BOARD_SIZE; ++x) {
    for (let y = 0; y < BOARD_SIZE; ++y) {
      if (board[x][y] === PLAYER_NONE) {
        const score = evaluatePoint(board, x, y, PLAYER_AI) + evaluatePoint(board, x, y, PLAYER_HUMAN) * 0.9;
        if (score > bestScore) {
          bestScore = score;
          move = { x, y };
        }
      }
    }
  }
  return move;
};

export {
  isBoardFull,
  isValidPosition,
  checkWin,
  computeAIMove,
};
