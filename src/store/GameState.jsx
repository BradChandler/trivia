import React, { useCallback, useReducer } from 'react';

const GameContext = React.createContext({
  game: {},
  setupGame: (rules) => {},
  resetGame: () => {}
});

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'SETUP_GAME': {
      return action.payload;
    }
    case 'RESET_GAME': {
      return {};
    }
    default: {
      console.error(`unknown action type:`, action.type)
      return state;
    }
  }
}

export const GameProvider = ({ children }) => {
  const [game, dispatch] = useReducer(gameReducer, {});

  const setupGameHandler = useCallback((rules) => {
    dispatch({ type: 'SETUP_GAME', payload: rules })
  }, [])

  const resetGameHandler = useCallback(() => {
    dispatch({ type: "RESET_GAME" })
  }, []);

  return ( 
    <GameContext.Provider value={{
      game, 
      setupGame: setupGameHandler, 
      resetGame: resetGameHandler
    }}>
      {children}
    </GameContext.Provider>
   );
}
 
export default GameContext;