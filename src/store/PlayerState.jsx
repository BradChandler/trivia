import React, { useCallback, useReducer } from 'react';

const PlayerContext = React.createContext({
  players: [], 
  addPlayers: (playerList) => {}, 
  incrementPlayerScore: (id) => {}, 
  resetPlayers: () => {}
});

const playerReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PLAYERS': {
      return action.payload;
    }
    case 'INCREMENT_PLAYER_SCORE': {
      return state.map(player => {
        if (player.id === action.payload) {
          return {...player, score: player.score + 1}
        }
        return player;
      })
    }
    case 'RESET_PLAYERS': {
      return [];
    }
    default: {
      console.error(`unknown action type:`, action.type)
      return state;
    }
  }
}

export const PlayerProvider = ({ children }) => {
  const [players, dispatch] = useReducer(playerReducer, []);

  const addPlayersHandler = useCallback((playerList) => {
    dispatch({ type: 'ADD_PLAYERS', payload: playerList })
  }, [])

  const incrementPlayerScoreHandler = useCallback((id) => {
    dispatch({ type: "INCREMENT_PLAYER_SCORE", payload: id });
  }, [])

  const resetPlayersHandler = useCallback(() => {
    dispatch({ type: "RESET_PLAYERS" })
  }, []);

  return ( 
    <PlayerContext.Provider value={{
      players, 
      addPlayers: addPlayersHandler, 
      incrementPlayerScore: incrementPlayerScoreHandler,
      resetPlayers: resetPlayersHandler
    }}>
      {children}
    </PlayerContext.Provider>
   );
}
 
export default PlayerContext;