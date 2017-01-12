import { monthNames, monthLengths } from './dateConstants';

function getCurrentMonth() {
  const today = new Date();
  const realMonthLengths = monthLengths.slice();
  if (today.getFullYear() % 4 === 0) {
    realMonthLengths[1]++;
  }
  const firstWeekday = (new Date(today.getFullYear(), today.getMonth(), 1)).getDay();
  return {
    name: monthNames[today.getMonth()],
    days: realMonthLengths[today.getMonth()],
    firstWeekday
  };
}

export { getCurrentMonth };
