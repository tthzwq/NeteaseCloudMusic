/**
 * formatTime
 * @param s 秒数
 * @returns hh:mm:ss | mm:ss
 */
export function formatTime(s: number | string): string {
  const time = Number(s);
  if (isNaN(time)) return "00:00"
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor((time % 3600) % 60);
  const minutesStr = String(minutes).padStart(2, '0');
  const secondsStr = String(seconds).padStart(2, '0');
  return `${hours > 0 ? `${hours}:` : ''}${minutesStr}:${secondsStr}`;
}