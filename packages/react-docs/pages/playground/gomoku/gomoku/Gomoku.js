/* eslint-disable react-hooks/set-state-in-effect */
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
} from '@tonic-ui/react';
import { useCallback, useRef, useEffect, useState } from 'react';
import { useLocale } from './LocaleProvider';
import {
  BOARD_SIZE,
  PLAYER_NONE,
  PLAYER_HUMAN,
  PLAYER_AI,
  BLACK_PIECE,
  WHITE_PIECE,
} from './constants';
import {
  checkWin,
  computeAIMove,
  isBoardFull,
  isValidPosition,
} from './utils';

const CELL_SIZE = 40;
const CANVAS_SIZE = BOARD_SIZE * CELL_SIZE;

const defaultBoard = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(PLAYER_NONE));

const Gomoku = () => {
  const isHumanWithBlackPiece = true;
  const canvasRef = useRef(null);
  const { setLang, t } = useLocale();  // Use the locale context
  const [board, setBoard] = useState(defaultBoard);
  const [isGameOver, setIsGameOver] = useState(false);
  const [message, setMessage] = useState(t('turn'));
  const [hoveredCell, setHoveredCell] = useState(null); // Track the hovered cell

  useEffect(() => {
    setMessage(isGameOver ? message : t('turn'));
  }, [isGameOver, message, t]);

  const drawBoard = useCallback(() => {
    const drawPiece = (ctx, x, y, color) => {
      const px = x * CELL_SIZE + CELL_SIZE / 2;
      const py = y * CELL_SIZE + CELL_SIZE / 2;
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
      ctx.arc(px, py, radius, 0, Math.PI * 2);
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

    const drawGhostPiece = (ctx, x, y, color) => {
      const px = x * CELL_SIZE + CELL_SIZE / 2;
      const py = y * CELL_SIZE + CELL_SIZE / 2;
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
      ctx.arc(px, py, radius, 0, Math.PI * 2);
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

    for (let x = 0; x < BOARD_SIZE; ++x) {
      for (let y = 0; y < BOARD_SIZE; ++y) {
        if (board[x][y] === PLAYER_HUMAN) {
          drawPiece(ctx, x, y, isHumanWithBlackPiece ? BLACK_PIECE : WHITE_PIECE);
        } else if (board[x][y] === PLAYER_AI) {
          drawPiece(ctx, x, y, isHumanWithBlackPiece ? WHITE_PIECE : BLACK_PIECE);
        }
      }
    }

    if (hoveredCell) {
      drawGhostPiece(ctx, hoveredCell.x, hoveredCell.y, isHumanWithBlackPiece ? BLACK_PIECE : WHITE_PIECE);
    }
  }, [board, hoveredCell, isHumanWithBlackPiece]);

  const handleClick = (e) => {
    if (isGameOver) {
      return;
    }
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / CELL_SIZE);
    const y = Math.floor((e.clientY - rect.top) / CELL_SIZE);
    if (board[x][y] !== PLAYER_NONE) {
      return;
    }

    const newBoard = board.map(row => [...row]);
    newBoard[x][y] = PLAYER_HUMAN;
    setBoard(newBoard);

    if (checkWin(newBoard, PLAYER_HUMAN, x, y)) {
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
        newBoard[aiMove.x][aiMove.y] = PLAYER_AI;
        setBoard([...newBoard]);
        if (checkWin(newBoard, PLAYER_AI, aiMove.x, aiMove.y)) {
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
    const x = Math.floor((e.clientX - rect.left) / CELL_SIZE);
    const y = Math.floor((e.clientY - rect.top) / CELL_SIZE);

    // Check for overflow and clear hovered cell if necessary
    if (!isValidPosition(x, y) || (board[x][y] !== PLAYER_NONE)) {
      setHoveredCell(null);
      return;
    }

    // Only update hoveredCell if the value has changed
    if (!hoveredCell || hoveredCell.x !== x || hoveredCell.y !== y) {
      setHoveredCell({ x, y });
    }
  };

  const handleMouseLeave = () => {
    // Clear the hovered cell when the mouse leaves the board
    setHoveredCell(null);
  };

  useEffect(() => {
    drawBoard();
  }, [board, drawBoard, hoveredCell]);

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
