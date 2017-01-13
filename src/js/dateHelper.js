import { monthNames, monthLengths } from './dateConstants';

function getCurrentMonth() {
  const today = new Date();
  const firstWeekday = (new Date(today.getFullYear(), today.getMonth(), 1)).getDay();
  return {
    name: monthNames[today.getMonth()],
    numberOfDays: getMonthLength(today.getMonth(), today.getFullYear()),
    firstWeekday
  };
}

function getDaysArray() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const displayMonth = (month + 1) < 10 ? '0' + (month + 1) : (month + 1);
  const monthLength = getMonthLength(month, year);

  const days = [];
  for (let i = 1; i <= monthLength; i++) {
    const displayDay = i < 10 ? '0' + i : i;
    days.push({ date: `${displayMonth}-${displayDay}-${year}`, displayNumber: i });
  }
  return days;
}

function getMonthLength(month, year) {
  const realMonthLengths = monthLengths.slice();
  if (year % 4 === 0) {
    realMonthLengths[1]++;
  }
  return realMonthLengths[month];
}

export { getCurrentMonth, getDaysArray };
