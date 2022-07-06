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

  const [readyState, setReadyState] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(0)
  const [currentQuestionNum, setCurrentQuestionNum] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState();
  const [actionConfig, setActionConfig] = useState([
    {
      type: "home", 
      text: "Quit Game", 
      link: '/', 
      name: "Quit game"
    },
    {
      type: "level", 
      text: `${currentQuestionNum} / ${game.questionCount}`
    }
  ])

  useEffect(() => {
    if (!players || players.length <= 0 || !game || Object.keys(game).length <= 0) {
      return navigate(`/${gameType}/player-setup`)
    }
  }, [game, players, gameType, navigate])

  const handleUpdateCurrentQuestion = (content) => setCurrentQuestion(content)

  const handleFinishQuestion = (shouldIncrement) => {
    const update = {
      type: "action", 
      text: "Next Question", 
      name: "Next Question", 
      callback: () => handleNextQuestion()
    }
    const updates = JSON.parse(JSON.stringify(actionConfig));
    updates[1] = update
    setActionConfig(updates)
    if (shouldIncrement) {
      incrementPlayerScore(players[currentPlayer].id)
    }
  }

  const handleNextQuestion = () => {
    let update;
    if (players[currentPlayer + 1]) {
      setCurrentPlayer(prevState => prevState + 1);
      update = {
        type: "level", 
        text: `${currentQuestionNum} / ${game.questionCount}`
      }
    } else {
      if (currentQuestionNum === game.questionCount) {
        //trigger end of game
      } else {
        setCurrentPlayer(0)
        setCurrentQuestionNum(prevState => currentQuestionNum + 1);
        update = {
          type: "level", 
          text: `${currentQuestionNum + 1} / ${game.questionCount}`
        }
      }
    }
    setReadyState(false);
    setCurrentQuestion(null);
    const updates = JSON.parse(JSON.stringify(actionConfig));
    updates[1] = update
    setActionConfig(updates)
  }

  return (
    <section className="height__vh page-stack">
      <Actions config={actionConfig} />
      <Container classNames="flex flex__col flex__left">
        { !readyState && <ReadyStart {...{...players[currentPlayer]}} game={game} question={currentQuestion} setQuestion={(val) => handleUpdateCurrentQuestion(val)} setReady={() => setReadyState(true)}/> }
        { readyState && <Question game={game} question={currentQuestion} name={players[currentPlayer].name} questionNum={currentQuestionNum} finishQuestion={(bool) => handleFinishQuestion(bool)}  /> }
      </Container>
    </section>
  );
}
 
export default TriviaGame;