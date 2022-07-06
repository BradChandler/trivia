import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useCallback, useEffect } from 'react';
import img from "../../assets/player-start.svg";
import Container from '../../components/Container';

const buildAPIUrl = (game) => {
  let baseUrl = 'https://opentdb.com/api.php?amount=1&type=multiple'
  if (game.category) {
    baseUrl += `&category=${game.category}`;
  }
  if (game.difficulty) {
    baseUrl += `&difficulty=${game.difficulty}`;
  }
  return baseUrl;
}

const ReadyStart = ({ name, score, game, question, setQuestion, setReady }) => {

  const fetchQuestion = useCallback(async() => {
    try {
      const res = await axios.get(buildAPIUrl(game));
      const { category, difficulty, question, correct_answer, incorrect_answers } = res.data.results[0];
      const cleanQuestion = {
        category, 
        difficulty, 
        question, 
        correct_answer, 
        answers: [correct_answer, ...incorrect_answers].sort()
      }
      setQuestion(cleanQuestion);
    } catch(err) {
      console.error(err);
    }
  },[game, setQuestion]);

  useEffect(() => {
    if (!question) {
      fetchQuestion();
    }
  }, [question, fetchQuestion])

  return (
    <section className="padding__md grid__one grid__just-null">
      <h1 className="text__center">{name} Ready?</h1>
      <p className="text__center">
        <FontAwesomeIcon icon={faCheck} className="text__green mr-xs" />
        {score} points
      </p>
      <Container>
        <img src={img} alt="Person ready to start race" width="100%" height="100%" className="rs-btn padding__md" />
      </Container>
      <button type="button" className="btn btn__cool-grey btn__md" onClick={setReady} disabled={!question}>{ !!question ? 'I\'m Ready!' : 'Loading Next Question' }</button>
    </section>
  );
}
 
export default ReadyStart;