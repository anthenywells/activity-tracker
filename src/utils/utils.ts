import moment from "moment"

const formatDuration = (duration: number) => {
  return moment.utc(duration * 1000).format('HH:mm:ss')
}

export const getDuration = (startTime: string, stopTime: string) => {
  let duration = moment.utc(stopTime, "HH:mm:ss").diff(moment.utc(startTime, "HH:mm:ss"), 'seconds');
  return formatDuration(duration) !== "Invalid date" ? formatDuration(duration) : ""
}