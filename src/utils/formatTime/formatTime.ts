export const formatTime = (timeElapsed: number): string => {
  const hours = Math.floor(timeElapsed / 3600);
  const minutes = Math.floor((timeElapsed % 3600) / 60);
  const seconds = timeElapsed % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
};
