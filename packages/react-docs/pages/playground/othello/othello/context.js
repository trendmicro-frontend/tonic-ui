import { createContext, useContext } from 'react';

const GameStateContext = createContext();

const useGameState = () => {
  const context = useContext(GameStateContext);
  return context;
};

export {
  GameStateContext,
  useGameState,
};
