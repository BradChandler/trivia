import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import img from "../../assets/player-start.svg";
import Container from '../../components/Container';

const ReadyStart = ({ name, score, callback }) => {
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
      <button type="button" className="btn btn__cool-grey btn__md" onClick={callback}>I'm Ready!</button>
    </section>
  );
}
 
export default ReadyStart;