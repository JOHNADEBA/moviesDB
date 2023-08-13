export const formatDate = (
  day: number,
  month: number,
  year: number
): string => {
  const date = new Date(year, month - 1, day);
  const formattedDate = new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);

  return formattedDate;
};

export const convertSecondsToHoursMins = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours < 1) {
    return `${minutes}m`;
  }
  return `${hours}h ${minutes}m`;
};
