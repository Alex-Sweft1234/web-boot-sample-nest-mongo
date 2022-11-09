export function howMuchDays(year, month) {
  const date1 = new Date(year, month - 1, 1);
  const date2 = new Date(year, month, 1);
  // @ts-ignore
  return Math.round((date2 - date1) / 1000 / 3600 / 24);
}
