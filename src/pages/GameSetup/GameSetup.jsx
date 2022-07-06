import { faFingerprint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Actions from "../../components/Actions";
import Container from "../../components/Container";
import { gamePresets, gameRules } from "../../data/setupValues";
import GameContext from "../../store/GameState";
import PlayerContext from "../../store/PlayerState";
import GamePreset from "./GamePreset";

const GameSetup = () => {
  const { gameType } = useParams();
  const [activePreset, setActivePreset] = useState()
  const { players } = useContext(PlayerContext)
  const { setupGame } = useContext(GameContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!players || players.length <= 0) {
      return navigate(`/${gameType}/player-setup`)
    }
  }, [players, gameType, navigate, setupGame])

  const actionConfig = [
    {
      type: "link", 
      text: "Player Setup", 
      link: `/${gameType}/player-setup`, 
      name: "Return to player setup"
    },
    {
      type: activePreset === "custom" ? "link" : "action", 
      text: activePreset === "custom" ? "Customize" : "Start Game", 
      link: activePreset === "custom" ? `/${gameType}/game-setup/custom` : null,
      name: activePreset === "custom" ? "Set Rules" : "Start Playing", 
      callback: () => handleSubmit()
    }, 
  ]

  const handleSubmit = (e) => {
    e && e.preventDefault();
    if (activePreset === "custom") {
      return navigate(`/${gameType}/game-setup/custom`)
    }
    setupGame(gameRules[activePreset]);
    return navigate(`/${gameType}/trivia-game`)
  }

  return ( 
    <section className="height__vh page-stack">
      <Actions config={actionConfig}/>
      <Container classNames="flex flex__col flex__left">
        <form onSubmit={handleSubmit} className="padding__sm grid__one grid__row-sm grid__just-null">
          <h1>Game Setup</h1>
          {
            gamePresets.map(preset => <GamePreset key={preset.id} {...{...preset, callback: (val) => setActivePreset(val), active: activePreset}}/>)
          }
          <label htmlFor="custom-game" className={`card card-preset grid__one grid__just-null grid__row-xs ${activePreset === "custom" ? 'card-preset--active' : ''}`}>
            <h2><FontAwesomeIcon icon={faFingerprint} size="lg" className="mr-xs" />Custom Game</h2>
            <input type="radio" id="custom-game" name="preset-selection" value="custom" onChange={(e) => setActivePreset(e.target.value)} />
          </label>
          <button type="submit" hidden onClick={handleSubmit}>Submit</button>
        </form>
      </Container>
    </section>
  );
}
 
export default GameSetup;