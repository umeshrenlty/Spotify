export const trimText = (text, maxLength) => {
  return text.length > maxLength
    ? text.substring(0, maxLength) + '...'
    : text.trim();
};

export const secondsToHHMMSS = seconds => {
  seconds = Number(seconds);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor((seconds % 3600) % 60);
  const hrs = h > 0 ? (h < 10 ? `0${h}:` : `${h}:`) : '';
  const mins = m > 0 ? (m < 10 ? `0${m}:` : `${m}:`) : '00:';
  const secs = s > 0 ? (s < 10 ? `0${s}` : s) : '00';
  return `${hrs}${mins}${secs}`;
};
