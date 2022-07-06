import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Actions from "../../components/Actions";
import Container from "../../components/Container";
import GameContext from "../../store/GameState";
import PlayerContext from "../../store/PlayerState";
import Question from './Question';
import ReadyStart from './ReadyStart';

const TriviaGame = () => {
  const navigate = useNavigate();
  const { gameType } = useParams();
  const { players, incrementPlayerScore } = useContext(PlayerContext)
  const { game } = useContext(GameContext);

  //for confirming next player is ready
  const [readyState, setReadyState] = useState(false);
  //for tracking which player should be answering
  const [currentPlayer, setCurrentPlayer] = useState(0)
  //for tracking which turn, once reach game.questionCount * player.length, the game is over
  const [currentTurn, setCurrentTurn] = useState(0);

  useEffect(() => {
    if (!players || players.length <= 0 || !game || Object.keys(game).length <= 0) {
      return navigate(`/${gameType}/player-setup`)
    }
  }, [game, players, gameType, navigate])

  const actionConfig = [
    {
      type: "home", 
      text: "Quit Game", 
      link: '/', 
      name: "Quit game"
    },
    {
      type: "level", 
      text: "1 / 10"
    },
    // {
    //   type: "action", 
    //   text: "Submit Answer", 
    //   name: "Submit Answer", 
    //   // callback: () => handleSubmit()
    // }, 
  ]

  const updateActionConfig = () => {
    actionConfig[1] = {
      type: "action", 
      text: "Next Question", 
      name: "Next Question", 
      // callback: () => handleSubmit()
    }
  }

  return (
    <section className="height__vh page-stack">
      <Actions config={actionConfig} />
      <Container classNames="flex flex__col flex__left">
        { !readyState && <ReadyStart {...{...players[currentPlayer]}} callback={() => setReadyState(true)}/> }
        { readyState && <Question game={game} /> }
      </Container>
    </section>
  );
}
 
export default TriviaGame;