import { formatTime } from "../utils/formatTime/formatTime";

export const saveResultToLocalStorage = (
  level: number,
  time: number,
  attempts: number
) => {
  const savedResults = JSON.parse(localStorage.getItem("gameResults") || "[]");

  const results = {
    level,
    time: formatTime(time),
    date: new Date().toLocaleString(),
    attempts,
  };

  savedResults.push(results);

  localStorage.setItem("gameResults", JSON.stringify(savedResults));
};

export const loadResultFromLocalStorage = () => {
  const savedResults = localStorage.getItem("gameResults");
  if (savedResults) {
    return JSON.parse(savedResults);
  }
  return null;
};
