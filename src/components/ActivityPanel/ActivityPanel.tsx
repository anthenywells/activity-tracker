import React from 'react';
import moment from "moment"

const ActivityPanel: React.FC<{ activityLog: any; }> = ({activityLog}) => {

  const formatDuration = (duration: number) => {
    return moment.utc(duration * 1000).format('HH:mm:ss')
  }

  const getDuration = (startTime: string, stopTime: string) => {
    let duration = moment.utc(stopTime, "HH:mm:ss").diff(moment.utc(startTime, "HH:mm:ss"), 'seconds');
    return formatDuration(duration) !== "Invalid date" ? formatDuration(duration) : ""
  }

  return (
    <table className="activity-panel">
      <tr className="activity-panel__activity">
        <th>description</th>
        <th>start time</th>
        <th>stop time</th>
        <th>duration</th>
      </tr>
      {activityLog.length > 0 && activityLog.map((activity: any, i: number) => {
        return (
          <tr className="activity-panel__activity" key={i}>
            <td>{activity.description}</td>
            <td>{activity.startTime}</td>
            <td>{activity.stopTime}</td>
            <td>{getDuration(activity.startTime, activity.stopTime)}</td>
          </tr>
        )
      })}
    </table>
  );
}

export default ActivityPanel;
