import { Route, Routes, useLocation } from "react-router-dom";
import About from "./pages/About/About";
import CompleteGame from "./pages/CompleteGame/CompleteGame";
import CustomGame from "./pages/CustomGame/CustomGame";
import GameSetup from "./pages/GameSetup/GameSetup";
import Home from "./pages/Home/Home";
import PlayerList from "./pages/PlayerLIst/PlayerList";
import TriviaGame from "./pages/TriviaGame/TriviaGame";

const routes = [
  { path: '/', name: 'Home', Component: Home },
  { path: '/about', name: 'About', Component: About },
  { path: '/:gameType/player-setup', name: "Add Players", Component: PlayerList }, 
  { path: '/:gameType/game-setup', name: "Game Setup", Component: GameSetup },
  { path: '/:gameType/game-setup/custom', name: "Custom Game Setup", Component: CustomGame },
  { path: '/:gameType/trivia-game', name: "Trivia Game", Component: TriviaGame },
  { path: '/:gameType/trivia-game/results', name: "Trivia Game Results", Component: CompleteGame}
]

function App() {
  let location = useLocation();

  return (
    <div className="App">
      <Routes location={location}>
        {routes.map(({path, Component}) => <Route path={path} element={<Component />} key={path} exact/>)}
      </Routes>
    </div>
  );
}

export default App;
