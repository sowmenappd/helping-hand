export const getRelativeTimestring: any = (time: string) => {
  const now = new Date().getTime();
  const then = new Date(time).getTime();

  const diffSeconds = (now - then) / 1000;
  const hours = Number(diffSeconds / 3600);
  const days = Number(hours / 24);

  if (days >= 1) {
    return `${
      Number(days.toFixed(0)) == 1 ? "a day" : days.toFixed(0) + " days"
    } ago`;
  }
  if (hours >= 1) {
    return `${
      Number(hours.toFixed(0)) == 1 ? "an hour" : hours.toFixed(0) + " hours"
    } ago`;
  }

  return "a while ago";
};
