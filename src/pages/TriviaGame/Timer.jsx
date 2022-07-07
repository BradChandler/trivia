import { useCallback, useEffect, useState } from "react";
import "./Timer.scss";

const FULL_DASH_ARRAY = 283;
const ALERT_THRESHOLD = 5;


const Timer = ({ time, totalTime }) => {

  const [dashArray, setDashArray] = useState();
  const [alertClass, setAlertClass] = useState('green');

  const calculateTimeFraction = useCallback(() => {
    const rawTimeFraction = time / totalTime;
    return rawTimeFraction - (1 / totalTime) * (1 - rawTimeFraction);
  }, [time, totalTime]);
    
  const setCircleDasharray = useCallback(() => {
    setDashArray(`${(
      calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`);
  }, [calculateTimeFraction])

  useEffect(() => {
    setCircleDasharray();
    if (time && time < ALERT_THRESHOLD) {
      setAlertClass('red');
    }
  }, [time, setCircleDasharray])

  return (
    <div className="base-timer">
      <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g className="base-timer__circle">
          <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45" />
          <path
          id="base-timer-path-remaining"
          strokeDasharray={dashArray}
          className={`base-timer__path-remaining ${alertClass}`}
          d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          "
        ></path>
        </g>
      </svg>
      <span id="base-timer-label" className="base-timer__label">
        {time}
      </span>
    </div>
  );
}
 
export default Timer;