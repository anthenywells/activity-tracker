import React from 'react';
import { getDuration } from "../../utils/utils"

const ActivityPanel: React.FC<{ activityLog: any; }> = ({ activityLog }) => {
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
