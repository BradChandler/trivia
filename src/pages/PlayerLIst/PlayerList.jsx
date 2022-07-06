import { faPlusSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Actions from "../../components/Actions";
import Container from "../../components/Container";
import Toast from "../../components/Toast";
import { createPlayer, defaultPlayers } from "../../data/setupValues";
import PlayerContext from "../../store/PlayerState";


const PlayerList = () => {
  const { gameType } = useParams();
  const isSinglePlayer = gameType === "single-player"
  const minNumPlayers = isSinglePlayer ? 1 : 2;
  const navigate = useNavigate();
  const { players, addPlayers } = useContext(PlayerContext);
  const [playerList, setPlayerList] = useState((players.length > 0 && players) || (isSinglePlayer ? defaultPlayers.slice(0,1) : defaultPlayers));
  const [isError, setIsError] = useState(false)

  const actionConfig = [
    {
      type: "link", 
      text: "Home", 
      link: "/", 
      name: "Return to home page"
    },
    {
      type: "action", 
      text: "Game Setup", 
      name: "Continue to game setup", 
      callback: () => handleSubmit()
    }
  ]
  
  const handleAddPlayer = () => setPlayerList([...playerList, createPlayer(playerList.length)]);
    
  const handleRemovePlayer = (id) => {
    const updates = playerList.filter(player => player.id !== id);
    setPlayerList(updates);
  }
  
  const handleChange = (update) => {
    const updates = playerList.map((player => {
      return player.id === update.id ? update : player;
    }))
    setPlayerList(updates);
    if (isError && playerList.every(player => player.name)) setIsError(false)
  }

  const handleSubmit = (e) => {
    e && e.preventDefault();
    
    const cleanPlayers = playerList.filter(player => player.name);
    if (cleanPlayers.length < minNumPlayers) {
      setIsError(true);
      return;
    }
    setIsError(false);
    addPlayers(cleanPlayers); 
    navigate(`/${gameType}/game-setup`)
  }

  return ( 
    <section className="height__vh page-stack">
      <Actions config={actionConfig}/>
      {isError && 
        <Toast 
          toggle={isError} 
          message={isSinglePlayer ? 'You must enter a player name' : 'You must enter names for at least 2 players'} 
          callback={() => setIsError(false)}
        /> 
      }
      <Container classNames="flex flex__col flex__left">
        <form onSubmit={handleSubmit} className="padding__sm grid__one grid__row-sm grid__just-null">
          <h1>Player Setup</h1>
          {
            playerList.map((player, index) => (
              <label htmlFor={`player-${index + 1}`} key={player.id}>
                Player{isSinglePlayer ? ' ' : ` ${index + 1} `}Name
                <input 
                  type="text" 
                  name={`player-${index + 1}`} 
                  id={`player-${index + 1}`} 
                  placeholder="Player name" 
                  onChange={(e) => handleChange({...player, name: e.target.value})}
                  value={player.name}
                />
                { playerList.length > 2 && 
                  <button type="button" className="player-delete--button" title={`Delete player ${index + 1}`} onClick={() => handleRemovePlayer(player.id)}>
                    <FontAwesomeIcon icon={faTrashCan} className="player-delete--icon" />
                  </button>
                }
              </label>
            ))
          }
          {!isSinglePlayer &&
            <button type="button" className="player-button pointer flex flex__left grid__col-xs text__medium text__cool-grey" onClick={handleAddPlayer}>
              <FontAwesomeIcon icon={faPlusSquare} size="2x" /> Add Player
            </button>
          }
          <button type="submit" hidden onClick={handleSubmit}>Submit</button>
        </form>
      </Container>
    </section>
  );
}
 
export default PlayerList;