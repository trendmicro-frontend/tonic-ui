import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
} from '@tonic-ui/react';
import React, { useRef, useEffect, useState } from 'react';
import { useLocale } from './LocaleProvider';

const BOARD_SIZE = 15;
const CELL_SIZE = 40;
const CANVAS_SIZE = BOARD_SIZE * CELL_SIZE;

const PLAYER_NONE = 0;
const PLAYER_HUMAN = 1;
const PLAYER_AI = 2;

const BLACK_PIECE = 'black';
const WHITE_PIECE = 'white';

const directions = [
  [1, 0],
  [0, 1],
  [1, 1],
  [1, -1],
];

const defaultBoard = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(PLAYER_NONE));

const Gomoku = () => {
  const isHumanWithBlackPiece = true;
  const canvasRef = useRef(null);
  const { lang, setLang, t } = useLocale();  // Use the locale context
  const [board, setBoard] = useState(defaultBoard);
  const [isGameOver, setIsGameOver] = useState(false);
  const [message, setMessage] = useState(t('turn'));
  const [hoveredCell, setHoveredCell] = useState(null); // Track the hovered cell

  useEffect(() => {
    drawBoard();
  }, [board, hoveredCell]);

  useEffect(() => {
    setMessage(isGameOver ? message : t('turn'));
  }, [lang]);

  const drawPiece = (ctx, i, j, color) => {
    const x = i * CELL_SIZE + CELL_SIZE / 2;
    const y = j * CELL_SIZE + CELL_SIZE / 2;
    const radius = CELL_SIZE / 2 - 4;

    // Save the current state of the canvas to restore later
    ctx.save();

    // Set shadow properties
    ctx.shadowBlur = 5;
    ctx.shadowColor = (color === BLACK_PIECE)
      ? 'rgba(0, 0, 0, 0.4)'
      : 'rgba(255, 255, 255, 0.4)';
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = (color === BLACK_PIECE)
      ? 'rgba(0, 0, 0, 1)'
      : 'rgba(255, 255, 255, 1)';
    ctx.fill();
    ctx.strokeStyle = (color === BLACK_PIECE)
      ? 'rgba(0, 0, 0, 0.2)'
      : 'rgba(255, 255, 255, 0.2)';
    ctx.stroke();

    // Restore the canvas state to remove the shadow effect for future drawings
    ctx.restore();
  };

  const drawGhostPiece = (ctx, i, j, color) => {
    const x = i * CELL_SIZE + CELL_SIZE / 2;
    const y = j * CELL_SIZE + CELL_SIZE / 2;
    const radius = CELL_SIZE / 2 - 4;

    // Save the current state of the canvas to restore later
    ctx.save();

    // Set shadow properties
    ctx.shadowBlur = 5;
    ctx.shadowColor = (color === BLACK_PIECE)
      ? 'rgba(0, 0, 0, 0.4)'
      : 'rgba(255, 255, 255, 0.4)';
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 8;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = (color === BLACK_PIECE)
      ? 'rgba(0, 0, 0)'
      : 'rgba(255, 255, 255)';
    ctx.fill();
    ctx.strokeStyle = (color === BLACK_PIECE)
      ? 'rgba(0, 0, 0, 0.2)'
      : 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Restore the canvas state to remove the shadow effect for future drawings
    ctx.restore();
  };

  const drawBoard = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    ctx.strokeStyle = '#333';

    for (let i = 0; i < BOARD_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE + CELL_SIZE / 2, CELL_SIZE / 2);
      ctx.lineTo(i * CELL_SIZE + CELL_SIZE / 2, CANVAS_SIZE - CELL_SIZE / 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(CELL_SIZE / 2, i * CELL_SIZE + CELL_SIZE / 2);
      ctx.lineTo(CANVAS_SIZE - CELL_SIZE / 2, i * CELL_SIZE + CELL_SIZE / 2);
      ctx.stroke();
    }

    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        if (board[i][j] === PLAYER_HUMAN) {
          drawPiece(ctx, i, j, isHumanWithBlackPiece ? BLACK_PIECE : WHITE_PIECE);
        } else if (board[i][j] === PLAYER_AI) {
          drawPiece(ctx, i, j, isHumanWithBlackPiece ? WHITE_PIECE : BLACK_PIECE);
        }
      }
    }

    if (hoveredCell) {
      drawGhostPiece(ctx, hoveredCell.i, hoveredCell.j, isHumanWithBlackPiece ? BLACK_PIECE : WHITE_PIECE);
    }
  };

  const handleClick = (e) => {
    if (isGameOver) {
      return;
    }
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const i = Math.floor(x / CELL_SIZE);
    const j = Math.floor(y / CELL_SIZE);
    if (board[i][j] !== PLAYER_NONE) {
      return;
    }

    const newBoard = board.map(row => [...row]);
    newBoard[i][j] = PLAYER_HUMAN;
    setBoard(newBoard);

    if (checkWin(newBoard, PLAYER_HUMAN)) {
      setIsGameOver(true);
      setMessage(t('win'));
      return;
    }

    if (isBoardFull(newBoard)) {
      setIsGameOver(true);
      setMessage(t('draw'));
      return;
    }

    setMessage(t('thinking'));

    setTimeout(() => {
      const aiMove = computeAIMove(newBoard);
      if (aiMove) {
        newBoard[aiMove.i][aiMove.j] = PLAYER_AI;
        setBoard([...newBoard]);
        if (checkWin(newBoard, PLAYER_AI)) {
          setIsGameOver(true);
          setMessage(t('lose'));
        } else if (isBoardFull(newBoard)) {
          setIsGameOver(true);
          setMessage(t('draw'));
        } else {
          setMessage(t('turn'));
        }
      }
    }, 200);
  };

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const i = Math.floor(x / CELL_SIZE);
    const j = Math.floor(y / CELL_SIZE);

    // Check for overflow and clear hovered cell if necessary
    if ((i < 0 || i >= BOARD_SIZE) || (j < 0 || j >= BOARD_SIZE) || (board[i][j] !== PLAYER_NONE)) {
      setHoveredCell(null);
      return;
    }

    // Only update hoveredCell if the value has changed
    if (!hoveredCell || hoveredCell.i !== i || hoveredCell.j !== j) {
      setHoveredCell({ i, j });
    }
  };

  const handleMouseLeave = () => {
    // Clear the hovered cell when the mouse leaves the board
    setHoveredCell(null);
  };

  const checkWin = (b, player) => {
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        if (b[i][j] === player) {
          for (let [dx, dy] of directions) {
            let count = 1;
            let k = 1;
            while (
              i + dx * k >= 0 &&
              i + dx * k < BOARD_SIZE &&
              j + dy * k >= 0 &&
              j + dy * k < BOARD_SIZE &&
              b[i + dx * k][j + dy * k] === player
            ) {
              count++;
              k++;
            }
            if (count >= 5) return true;
          }
        }
      }
    }
    return false;
  };

  const isBoardFull = (b) => {
    return b.every(row => row.every(cell => cell !== PLAYER_NONE));
  };

  const computeAIMove = (b) => {
    let bestScore = -Infinity;
    let move = null;
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        if (b[i][j] === PLAYER_NONE) {
          const score = evaluatePoint(b, i, j, PLAYER_AI) + evaluatePoint(b, i, j, PLAYER_HUMAN) * 0.9;
          if (score > bestScore) {
            bestScore = score;
            move = { i, j };
          }
        }
      }
    }
    return move;
  };

  const evaluatePoint = (b, x, y, player) => {
    let total = 0;
    const opponent = player === PLAYER_HUMAN ? PLAYER_AI : PLAYER_HUMAN;
    for (let [dx, dy] of directions) {
      let count = 1;
      let block = 0;
      for (let step = 1; step < 5; step++) {
        const i = x + dx * step;
        const j = y + dy * step;
        if (i < 0 || i >= BOARD_SIZE || j < 0 || j >= BOARD_SIZE) {
          block++;
          break;
        } else if (b[i][j] === opponent) {
          block++;
          break;
        } else if (b[i][j] === player) {
          count++;
        } else {
          break;
        }
      }
      for (let step = 1; step < 5; step++) {
        const i = x - dx * step;
        const j = y - dy * step;
        if (i < 0 || i >= BOARD_SIZE || j < 0 || j >= BOARD_SIZE) {
          block++;
          break;
        } else if (b[i][j] === opponent) {
          block++;
          break;
        } else if (b[i][j] === player) {
          count++;
        } else {
          break;
        }
      }

      if (count >= 5) total += 10000;
      else if (count === 4) total += block === 0 ? 1000 : 100;
      else if (count === 3) total += block === 0 ? 100 : 10;
      else if (count === 2) total += 10;
    }
    return total;
  };

  return (
    <Box sx={{ textAlign: 'center', p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
        <Menu>
          <MenuButton>
            {t('lang')}
          </MenuButton>
          <MenuList
            width="max-content"
            onClick={(event) => {
              const value = event.target.getAttribute('value');
              setLang(value);
            }}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="zh-cn">简体中文</MenuItem>
            <MenuItem value="zh-tw">繁體中文</MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <Box mb="4x">
        <Text size="lg">
          {message}
        </Text>
      </Box>
      <Box
        mb="4x"
        position="relative"
      >
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          onClick={handleClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            backgroundColor: '#f0d9b5',
            border: '1px solid #333',
            cursor: 'pointer',
            opacity: isGameOver ? .4 : 1,
          }}
        />
        {isGameOver && (
          <Box
            position="absolute"
            left="50%"
            top="50%"
            transform="translate(-50%, -50%)"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                setBoard(defaultBoard);
                setIsGameOver(false);
                setMessage(t('turn'));
              }}
            >
              {t('restart')}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Gomoku;
