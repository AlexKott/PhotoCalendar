import { monthNames, monthLengths } from './dateConstants';

function getCurrentMonth() {
    const today = new Date();
    const firstWeekday = (new Date(today.getFullYear(), today.getMonth(), 1)).getDay();
    return {
        month: today.getMonth(),
        year: today.getFullYear(),
        displayName: `${monthNames[today.getMonth()]} ${today.getFullYear()}`,
        numberOfDays: getMonthLength(today.getMonth(), today.getFullYear()),
        firstWeekday
    };
}

function selectMonth(month, year) {
    const date = new Date(year, month, 1);
    return {
        month: date.getMonth(),
        year: date.getFullYear(),
        displayName: `${monthNames[date.getMonth()]} ${date.getFullYear()}`,
        numberOfDays: getMonthLength(date.getMonth(), date.getFullYear()),
        firstWeekday: date.getDay()
    };
}

function getDaysArray(month, year) {
    const selectedYear = year ? year : (new Date()).getFullYear();
    const selectedMonth = month ? month : (new Date()).getMonth();
    const displayMonth = (selectedMonth + 1) < 10 ? '0' + (selectedMonth + 1) : (selectedMonth + 1);
    const monthLength = getMonthLength(selectedMonth, selectedYear);

    const days = [];
    for (let i = 1; i <= monthLength; i++) {
        const displayDay = i < 10 ? '0' + i : i;
        days.push({ date: `${displayMonth}-${displayDay}-${selectedYear}`, displayNumber: i });
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

export { getCurrentMonth, selectMonth, getDaysArray };
