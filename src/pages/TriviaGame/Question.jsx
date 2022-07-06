import { faCheckCircle, faChevronRight, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { decode } from 'html-entities';
import { useCallback, useEffect, useState } from "react";
import Timer from "./Timer";


const Question = ({ game, question, name, questionNum, finishQuestion }) => {
  const [timerId, setTimerId] = useState();
  const [second, setSecond] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState();

  const handleSelectAnswer = useCallback((value) => {
    clearTimeout(timerId);
    setSelectedAnswer(value);
    finishQuestion(value === question.correct_answer);
    //empty dependency array to preven re-render loop
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  useEffect(() => {
    if (second === null && game.timerOn) {
      return setSecond(game.timerLength / 1000);
    }
    if (game.timerOn && second > 0 && !selectedAnswer) {
      const id = setTimeout(() => {
        setSecond(prevState => prevState - 1);
      }, 1000)
      setTimerId(id)
    }
    if (game.timerOn && second <= 0 && !selectedAnswer) {
      handleSelectAnswer("incorrect");
    }
  }, [second, game.timerOn, game.timerLength, selectedAnswer, handleSelectAnswer])

  const isCorrect = selectedAnswer === question.correct_answer;

  const getAnswerStatus = (value) => {
    if (selectedAnswer) {
      if (value === selectedAnswer && isCorrect) {
        return 'trivia-answer--selected trivia-answer--right';
      }
      if (value === selectedAnswer && !isCorrect) {
        return 'trivia-answer--selected trivia-answer--wrong'
      }
      if (value !== selectedAnswer && value === question.correct_answer) {
        return 'trivia-answer--selected trivia-answer--reveal'
      }
    }
    return selectedAnswer ? 'trivia-answer--selected' : '';
  }

  const handleSubmit = (e) => {
    e && e.preventDefault();
    if (!selectedAnswer) return;
  }

  return (
    <form onSubmit={handleSubmit} className="grid__one padding__md grid__just-null">
      <div className="flex flex__left grid__col-xs">
        <h1 className="text__center text__regular text__sea-green">Question { questionNum }</h1>
        <FontAwesomeIcon icon={faChevronRight} size="sm" className="text__sea-green" />
        <h2 className="text__center text__regular text__sea-green">{ name } </h2>
      </div>
      <div className="padding__sm">
      {game.timerOn &&
        <div className="flex flex__center">
        {second > 0 && !selectedAnswer
          ? <Timer time={second} totalTime={game.timerLength / 1000}/>
          : <div className="grid__one grid__row-xs"> 
              <FontAwesomeIcon icon={isCorrect ? faCheckCircle : faTimesCircle} size="4x" className={`${isCorrect ? 'text__green' : 'text__red'}`}/>
              <p className={`text__bold ${isCorrect ? 'text__green' : 'text__red'}`}>{ isCorrect ? 'Correct!' : 'Wrong' }</p>
            </div>
        }
        </div>
      }
      {
        !game.timerOn && selectedAnswer &&
        <div className="grid__one grid__row-xs"> 
          <FontAwesomeIcon icon={isCorrect ? faCheckCircle : faTimesCircle} size="4x" className={`${isCorrect ? 'text__green' : 'text__red'}`}/>
          <p className={`text__bold ${isCorrect ? 'text__green' : 'text__red'}`}>{ isCorrect ? 'Correct!' : 'Wrong' }</p>
        </div>
      }
      </div>
      <p className="flex flex__center grid__col-xs text__light text__medium">
        <span>Category: { question.category }</span>
        |
        <span className="text__upper">{ question.difficulty }</span>
      </p>
      <p className="text__center question-text">
        { decode(question.question) }
      </p>
      { 
        question.answers.map((answer, index) => (
            <label htmlFor={`${index} ${answer}`} key={answer} className={`trivia-answer btn btn__md ${getAnswerStatus(answer)}`} disabled={selectedAnswer}>
              { answer }
              <input type="radio" id={`${index} ${answer}`} value={answer} name="trivia-answer" onChange={(e) => handleSelectAnswer(e.target.value)} disabled={selectedAnswer}/>
            </label>
          )
        )
      }
      <button type="submit" hidden onClick={handleSubmit}>Submit</button>
    </form>
  );
}
 
export default Question;