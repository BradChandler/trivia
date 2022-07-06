import { faClock, faLayerGroup, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const GamePreset = ({ id, img, heading, config, name, value, callback, active }) => {
  return (
    <label htmlFor={id} className={`card card-preset grid__one grid__just-null grid__row-xs ${active === value ? 'card-preset--active' : ''}`}>
      <h2>{heading}</h2>
      <img src={img} width="100%" height="100%" alt={`${heading}`} />
      <ul className="grid__one grid__just-null">
        <li>
          <FontAwesomeIcon icon={faQuestion} />
          { config.questionCount } Questions
        </li>
        <li>
          <FontAwesomeIcon icon={faLayerGroup} />
          { config.categories }
        </li>
        <li>
          <FontAwesomeIcon icon={faClock} />
          { config.timer } Second Timer
        </li>
      </ul>
      <input type="radio" id={id} name={name} value={value} onChange={(e) => callback(e.target.value)} />
    </label>
  );
}
 
export default GamePreset;