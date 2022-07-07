import { faCheck, faCheckDouble, faUserGraduate, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Container from '../../components/Container';
import { openTBCategories } from '../../data/setupValues';
import GameContext from "../../store/GameState";
import PlayerContext from "../../store/PlayerState";

const thresholds = [
  {
    rate: 0, 
    icon: faXmark, 
    className: "text__red"
  }, 
  {
    rate: 0.7, 
    icon: faCheck, 
    className: "text__sea-green"
  }, 
  {
    rate: 0.9, 
    icon: faCheckDouble, 
    className: "text__green"
  }
]

const CompleteGame = () => {
  const navigate = useNavigate();
  const { gameType } = useParams();
  const { players, resetPlayerScores } = useContext(PlayerContext)
  const { game } = useContext(GameContext);

  useEffect(() => {
    if (!players || players.length <= 0 || !game || Object.keys(game).length <= 0) {
      return navigate(`/${gameType}/player-setup`)
    }
  }, [game, players, gameType, navigate])
  
  const difficulty = game.difficulty || "any";
  let category;
  if (!game.category) {
    category = "any";
  } else {
    category = openTBCategories.filter(rule => rule.value === game.category)[0].text;
  }

  const playerComponents = players.sort((a, b) => a.score - b.score)
    .map(player => {
      const score = player.score / game.questionCount;
      const {icon, className} = thresholds.reduce((a, b) => {
        if (score > b.rate) {
          a = b;
        }
        return a;
      }, null);
      return (
        <li key={player.id} className="card flex flex__between">
          <div className="flex flex__left">
            <FontAwesomeIcon icon={faUserGraduate} size="2x" className="mr-xs" />
            <div className="grid grid__one grid__row-null grid__just-null">
              <p className="text__medium text__md mr-xs">{player.name}</p>
              <span>{ player.score } points</span>
            </div>
          </div>
          <span className="flex flex__between grid__col-xs">
            <FontAwesomeIcon icon={icon} className={className} size="2x" />
          </span>
        </li>
      )
    })

  const handleReplayGame = () => {
    resetPlayerScores();
    navigate(`/${gameType}/trivia-game`);
  }

  return (
    <Container classNames="height__vh page-stack flex flex__center">
      <section className="grid grid__one padding__md">
        <h1>Results</h1>
        <ul className="grid__one grid__row-xs grid__just-null">
          <li className="flex flex__between grid__col-xs text__sea-green">
            <span className="text__medium">Category:</span>
            { category }
          </li>
          <li className="flex flex__between grid__col-xs text__sea-green">
            <span className="text__medium">Questions:</span>
            { game.questionCount }
          </li>
          <li className="flex flex__between grid__col-xs text__sea-green">
            <span className="text__medium">Difficulty:</span>
            { difficulty }
          </li>
        </ul>
        <ul className="grid grid__one grid__row-xs padding__md width__100">
          {
            playerComponents
          }
        </ul>
        <div className="grid__one grid__row-xs grid__just-null">
          <button className="btn btn__md btn__cool-grey" onClick={handleReplayGame}>Replay Game</button>
          <Link to="/" name="Return to home" className="btn btn__md btn__cool-grey">Return to Home</Link>
        </div>
      </section>
    </Container>
  );
}
 
export default CompleteGame;