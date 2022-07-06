import { faChevronLeft, faChevronRight, faPowerOff, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import './Actions.scss';
import Container from './Container';

const generateContent = (side, direction) => {
  const icon = direction === "left" ? faChevronLeft : faChevronRight;
  if (side.type === 'level') {
    return <p className='text__medium flex flex__center action-level' key="level"><FontAwesomeIcon icon={faQuestionCircle} className="mr-xs"/>{side.text}</p>
  }
  if (side.type === 'home') {
    return <Link to='/' name={side.name} className='text__medium flex flex__center action-link' key="home"><FontAwesomeIcon icon={faPowerOff}/>{side.text}</Link>
  } 
  if (side.type === "link") {
    return <Link to={side.link} name={side.name} className={`text__medium flex flex__center action-link ${direction === "right" ? 'flex__reverse' : ''}`} key={direction}><FontAwesomeIcon icon={icon}/>{side.text}</Link>
  }
  if (side.type === "action") {
    return <button type="button" name={side.name} className={`text__medium flex flex__center action-btn ${direction === "right" ? 'flex__reverse' : ''}`} key={direction} onClick={() => side.callback()}><FontAwesomeIcon icon={icon}/>{side.text}</button>
  }
}

const Actions = ({ config }) => {
  const [left, right] = config;
  const content = [];
  content.push(generateContent(left, "left"))
  if (right) {
    content.push(generateContent(right, "right"));
  }
  return ( 
    <section className="actions">
      <Container>
        <section className="flex flex__between">
          { content }
        </section>
      </Container>
    </section>
  );
}
 
export default Actions;