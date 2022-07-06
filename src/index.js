import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from "react-router-dom";
import App from './App';
import { GameProvider } from './store/GameState';
import { PlayerProvider } from './store/PlayerState';
import "./styles/main.scss";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <PlayerProvider>
        <GameProvider>
          <App />
        </GameProvider>
      </PlayerProvider>
    </HashRouter>
  </React.StrictMode>
);