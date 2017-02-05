import { monthNames, monthLengths, weekdays } from './dateConstants';

function getDateString(day, month, year) {
    const today = new Date();
    const givenDay = day ? day : today.getDate();
    const givenMonth = (typeof month === 'undefined') ? (today.getMonth() + 1) : (month + 1);
    const givenYear = year ? year : today.getFullYear();

    const displayDay = givenDay < 10 ? '0' + givenDay : givenDay;
    const displayMonth = givenMonth < 10 ? '0' + givenMonth : givenMonth;
    return `${givenYear}-${displayMonth}-${displayDay}`;
}

function getDateStringFromDate(date) {
    return getDateString(date.getDate(), date.getMonth(), date.getFullYear());
}

function selectMonth(month, year) {
    const today = new Date();
    const givenYear = year ? year : today.getFullYear();
    const givenMonth = (typeof month === 'undefined') ? today.getMonth() : month;
    const date = new Date(givenYear, givenMonth, 1);
    return {
        month: date.getMonth(),
        year: date.getFullYear(),
        displayName: `${monthNames[date.getMonth()]} ${date.getFullYear()}`,
        numberOfDays: getMonthLength(date.getMonth(), date.getFullYear()),
        firstWeekday: date.getDay(),
        requestString: getDateString(date.getDate(), date.getMonth(), date.getFullYear()).slice(0, 7)
    };
}

function getDaysArray(month, year) {
    const selectedYear = year ? year : (new Date()).getFullYear();
    const selectedMonth = (typeof month === 'undefined') ? (new Date()).getMonth() : month;
    const monthLength = getMonthLength(selectedMonth, selectedYear);

    const days = [];
    for (let i = 1; i <= monthLength; i++) {
        days.push({ date: getDateString(i, selectedMonth, selectedYear), displayNumber: i });
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

function getDisplayDay(dateString) {
    const date = new Date(dateString);
    const weekday = weekdays[date.getDay()];
    const monthName = monthNames[date.getMonth()];
    return `${weekday}, ${monthName} ${date.getDate()}`;
}

export { getDateString, getDateStringFromDate, selectMonth, getDaysArray, getDisplayDay };
