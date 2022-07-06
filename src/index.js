import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import { GameProvider } from './store/GameState';
import { PlayerProvider } from './store/PlayerState';
import "./styles/main.scss";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <PlayerProvider>
        <GameProvider>
          <App />
        </GameProvider>
      </PlayerProvider>
    </BrowserRouter>
  </React.StrictMode>
);