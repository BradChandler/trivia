import { faBan, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSTransition } from 'react-transition-group';
import "./Toast.scss";

const Toast = ({ toggle, message, callback }) => {
  return (
    <CSSTransition in={toggle} timeout={250} classNames="toast">
      <div className="toast bg__red">
        <FontAwesomeIcon icon={faBan} size="2x" className="text__white" />
        <p className="text__white">{ message }</p>
        <FontAwesomeIcon icon={faTimes} className="text__white icon-exit" onClick={() => callback()} />
      </div>
    </CSSTransition>
  );
}
 
export default Toast;