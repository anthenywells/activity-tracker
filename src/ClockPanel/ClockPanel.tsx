import React, { useState } from 'react';
import moment from "moment"
import ActivityPanel from '../ActivityPanel/ActivityPanel';

const ClockPanel: React.FC = () => {
  const [activityStarted, setActivityStarted] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [description, setDescription] = useState("");

  let activityLog: any[] = JSON.parse(localStorage.getItem("activityLog") || '[]');

  const startActivity = () => {
    activityLog = JSON.parse(localStorage.getItem("activityLog") || '[]')
    let activity = {
      startTime: moment().format("HH:mm:ss"),
      stopTime: "",
      description: description
    }
    activityLog.push(activity);
    setStartTime(activity.startTime)
    localStorage.setItem("activityLog", JSON.stringify(activityLog))
    setActivityStarted(!activityStarted);
  }

  const stopActivity = () => {
    activityLog = JSON.parse(localStorage.getItem("activityLog") || '{}')
    for (let i of activityLog) {
      if (i.startTime === startTime) {
        i.stopTime = moment().format("HH:mm:ss");
        console.log("TCL: stopActivity -> activityLog", activityLog)
        localStorage.setItem("activityLog", JSON.stringify(activityLog))
        setDescription("")
        setActivityStarted(!activityStarted);
        break;
      }
    }
  }

  return (
    <>
      <div className="clock-panel">
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
            className="clock-panel__button primary"
            onClick={() => { startActivity() }}
            disabled={activityStarted}>
            Start Activity
          </button>
        ) : (
          <button
              className="clock-panel__button danger"
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
