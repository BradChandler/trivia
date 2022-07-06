import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Actions from "../../components/Actions";
import Container from "../../components/Container";
import { gameRules, openTBCategories } from "../../data/setupValues";
import GameContext from "../../store/GameState";
import PlayerContext from "../../store/PlayerState";

const CustomGame = () => {
  const navigate = useNavigate();
  const { gameType } = useParams();
  const { players } = useContext(PlayerContext)
  const { setupGame } = useContext(GameContext);
  const [rules, setRules] = useState({...gameRules["custom"]})
  
  useEffect(() => {
    if (!players || players.length <= 0) {
      return navigate(`/${gameType}/player-setup`)
    }
  }, [players, gameType, navigate])

  const actionConfig = [
    {
      type: "link", 
      text: "Game Setup", 
      link: `/${gameType}/game-setup`, 
      name: "Return to game setup"
    },
    {
      type: "action", 
      text: "Start Game", 
      link: `/${gameType}/trivia-game`,
      name: "Start Playing", 
      callback: () => handleSubmit()
    }, 
  ]

  const updateRule = (ruleName, value) => {
    const update = {...rules};
    update[ruleName] = value;
    setRules(update);
  }

  const handleSubmit = (e) => {
    e && e.preventDefault();
    setupGame(rules);
    return navigate(`/${gameType}/trivia-game`)
  }

  return ( 
    <section className="height__vh page-stack">
      <Actions config={actionConfig}/>
      <Container classNames="flex flex__col flex__left">
        <form onSubmit={handleSubmit} className="padding__sm grid__one grid__row-sm grid__just-null">
          <h1>Custom Game</h1>
          <label htmlFor="timer-toggle">
            Timer
            <div className={`form-toggle ${rules['timerOn'] ? 'form-toggle--on' : 'form-toggle--off'}`}>
              <span>Off</span>
              <span>On</span>
              <div className="form-toggle--slide"></div>
              <input type="checkbox" id="timer-toggle" name="timer-toggle" checked={rules['timerOn']} onChange={(e) => updateRule('timerOn', e.target.checked)} />
            </div>
          </label>
          {
            rules['timerOn'] && 
          <label htmlFor="#">
            <span className="text__medium">
              Timer Length
              <span className="text__sm ml-xs">{rules['timerLength'] / 1000}s</span>
            </span>
            <input type="range" min="5000" max="30000" step="1000" value={rules['timerLength']} onChange={(e) => updateRule('timerLength', parseInt(e.target.value))}/>
          </label>
          }
          <label>
            Question Count
            <select value={rules['questionCount']} onChange={(e) => {updateRule('questionCount', parseInt(e.target.value))}}>
              <option value={10}>10 Questions</option>
              <option value={15}>15 Questions</option>
              <option value={20}>20 Questions</option>
              <option value={25}>25 Questions</option>
              <option value={30}>30 Questions</option>
            </select>
          </label>
          <label>
            Trivia Category
            <select value={rules['category']} onChange={(e) => {updateRule('category', parseInt(e.target.value))}}>
              <option value="">Any Category</option>
              {
                openTBCategories.map(cat => <option value={cat.value} key={cat.value}>{ cat.text }</option>)
              }
            </select>
          </label>
          <label>
            Trivia Difficulty
            <select value={rules['difficulty']} onChange={(e) => {updateRule('difficulty', e.target.value)}}>
              <option value="">Any Difficulty</option>
              <option value="easy">Easy Difficulty</option>
              <option value="medium">Medium Difficulty</option>
              <option value="hard">Hard Difficulty</option>
            </select>
          </label>
          <button type="submit" hidden onClick={handleSubmit}>Submit</button>
        </form>
      </Container>
    </section>
  );
}
 
export default CustomGame;