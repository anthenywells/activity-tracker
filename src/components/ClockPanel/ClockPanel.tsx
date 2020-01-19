import React from 'react';
import moment from "moment"
import ActivityPanel from '../ActivityPanel/ActivityPanel';
import {useLocalStorage} from "../../hooks/hooks"
import "./ClockPanel.scss"

const ClockPanel: React.FC = () => {
  const [activityStarted, setActivityStarted] = useLocalStorage("activity", false);
  const [activityLog, setActivityLog] = useLocalStorage("activityLog", []);
  const [startTime, setStartTime] = useLocalStorage("startTime", "");
  const [description, setDescription] = useLocalStorage("desc","");


  const startActivity = () => {
    const startTime = moment().format("HH:mm:ss")
    setActivityLog((activityLog: Array<any>) => [...activityLog, { description, startTime, stopTime: "" }])
    setStartTime(startTime)
    setActivityStarted(!activityStarted);
  }

  const stopActivity = () => {
    for (let i of activityLog) {
      if (i.startTime === startTime) {
        const stopTime = moment().format("HH:mm:ss");
        i.stopTime = stopTime
        setDescription("")
        setActivityLog(activityLog)
        setActivityStarted(!activityStarted);
        break;
      }
    }
  }


  return (
    <>
      <div className="clock-panel box mobile">
        <input
          className="clock-panel__input"
          type="text"
          placeholder="Enter an activity"
          value={description}
          onChange={(e) => { setDescription(e.target.value) }}
          disabled={activityStarted}
        />
        {!activityStarted ? (
          <button
            className="button primary"
            onClick={() => { startActivity() }}
            disabled={activityStarted}>
            Start Activity
          </button>
        ) : (
            <button
              className="button danger"
              onClick={() => { stopActivity() }}
              disabled={!activityStarted}>
              Stop Activity
          </button>
          )}
      </div>
      <ActivityPanel activityLog={activityLog} />
    </>
  );
}

export default ClockPanel;
