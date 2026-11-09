export function formatDate(date: string): string {
  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsedDate);
}

export function daysUntil(date: string): number {
  const targetDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(targetDate.getTime())) {
    return Number.NaN;
  }

  const today = new Date();

  const targetDay = Date.UTC(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate(),
  );

  const currentDay = Date.UTC(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  return Math.round((targetDay - currentDay) / 86400000);
}