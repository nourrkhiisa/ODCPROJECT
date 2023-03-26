export const formatDate = (date, format) => {
  const d = new Date(date);
  const map = {
    M: d.getMonth() + 1,
    d: d.getDate(),
    Y: d.getFullYear(),
  };

  return format.replace(/M|d|Y/g, (matched) => map[matched]);
};

export const addDays = (date, days) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

export const isSameDay = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

export const isBefore = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return d1.getTime() < d2.getTime();
};

export const isAfter = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return d1.getTime() > d2.getTime();
};
