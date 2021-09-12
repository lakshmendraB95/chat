export function formatTime(ts) {
  const date = new Date(ts);
  return date.toLocaleString();
}
