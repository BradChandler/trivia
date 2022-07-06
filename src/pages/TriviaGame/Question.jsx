import { faChevronRight, faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Timer from "./Timer";

const Question = ({ game, name, currentTurn }) => {
  const [timerId, setTimerId] = useState();
  const [second, setSecond] = useState(null);
  
  useEffect(() => {
    if (second === null) {
      return setSecond(20);
    }
    if (second > 0) {
      const id = setTimeout(() => {
        setSecond(prevState => prevState - 1);
      }, 1000)
      setTimerId(id)
    } else {
      
    }
  }, [second])

  return (
    <form className="grid__one padding__md grid__just-null">
      <div className="flex flex__left grid__col-xs">
        <h1 className="text__center text__regular text__sea-green">Question 1</h1>
        <FontAwesomeIcon icon={faChevronRight} size="sm" className="text__sea-green" />
        <h2 className="text__center text__regular text__sea-green">Player 1</h2>
      </div>
      <div className="padding__sm">
      {game.timerOn &&
        <div className="flex flex__center">
        {second > 0 
          ? <Timer time={second} totalTime={game.timerLength / 1000}/>
          : <div className="grid__one grid__row-xs"> 
              <FontAwesomeIcon icon={faStopwatch} size="4x" className="text__red"/>
              <p className="text__bold text__red">Time's Up!</p>
            </div>
        }
        </div>
      }
      </div>
      <p className="text__light text__medium text__center">Category Name</p>
      <p className="text__center">
        Question text is here
      </p>
      <label htmlFor="answer-1" className="trivia-answer btn btn__md">
        Answer 1
        <input type="radio" id="answer-1" name="trivia-answers" />
      </label>
      <label htmlFor="answer-1" className="trivia-answer btn btn__md">
        Answer 1
        <input type="radio" id="answer-2" name="trivia-answers" />
      </label>
    </form>
  );
}
 
export default Question;