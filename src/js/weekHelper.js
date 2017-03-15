// input: events per week
function getEventWeek(week, eventArray) {
    let totalSize = 7;
    const eventWeek = [];
    const { weekStart, weekEnd } = getWeekBounds(week);

    const dummyEvent = getDummyEvent(weekStart, weekEnd);
    totalSize -= dummyEvent.size;

    for (i = 0; i < eventArray.length; i++) {
        const event = eventArray[i];

        const eventStartsBeforeWeek = event.startDate <= weekStart.date;
        const eventEndsAfterWeek = event.endDate >= weekEnd.date;

        const eventStartDay = event.startDate.substring(8);
        const eventEndDay = event.endDate.substring(8);

        const eventSharesStartDay = event.startDate === eventArray[i - 1].endDate;
        const eventSharesEndDay = event.endDate === eventArray[i + 1].startDate;

        if (eventStartsBeforeWeek && eventEndsAfterWeek) {
            event.size = totalSize;
        } else if (eventStartsBeforeWeek) {
            event.size = (eventEndDay - weekStart.displayNumber) + (eventSharesEndDay ? 0.5 : 1);
        } else if (eventEndsAfterWeek) {
            event.size = (weekEnd.displayNumber - eventStartDay) + (eventSharesStartDay ? 0.5 : 1);
        } else {
            event.size = (eventEndDay - eventStartDay) + 1
                - (eventSharesStartDay ? 0.5 : 0)
                - (eventSharesEndDay ? 0.5 : 0);
        }
        totalSize -= event.size;
        eventWeek.push(event);
    }
    // dummyEvent.size += totalSize;
    if (dummyEvent.size) {
        dummyEvent.start ? eventWeek.unshift(dummyEvent) : eventWeek.push(dummyEvent);
    }

    return eventWeek;
}

function getWeekBounds(week) {
    const weekStart = week.find((day) => day.date !== null);
    const weekEnd = week.reverse().find((day) => day.date !== null);

    return({ weekStart, weekEnd });
}

function getDummyEvent(weekStart, weekEnd) {
    let dummyEvent = {};
    const weekDays = (weekEnd.displayNumber - weekStart.displayNumber) + 1;
    if (weekDays < 7) {
        const start = weekStart.displayNumber === 1;
        dummyEvent = { isEvent: false, size: 7 - weekDays, start };
    }
    return dummyEvent;
}

export { getEventWeek, getWeekBounds, getDummyEvent };
