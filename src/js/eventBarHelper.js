function getEventBars(weeks, events) {
    const eventBars = [];
    weeks.forEach((week) => {
        const weekEvents = filterEventsForWeek(week, events);
        const eventBar = getEventWeek(week, weekEvents);
        eventBars.push(eventBar);
    })
    return eventBars;
}

function filterEventsForWeek(week, events) {
    const weekEvents = [];
    const { weekStart, weekEnd } = getWeekBounds(week);
    events.forEach((event) => {
        const isEventStartWithinWeek = event.startDate >= weekStart.date && event.startDate <= weekEnd.date;
        const isEventEndWithinWeek = event.endDate >= weekStart.date && event.endDate <= weekEnd.date;
        const isEventDuringWholeWeek = event.startDate <= weekStart.date && event.endDate >= weekEnd.date;
        if (isEventStartWithinWeek || isEventEndWithinWeek || isEventDuringWholeWeek) {
            weekEvents.push(event);
        }
    });
    return weekEvents;
}

function getEventWeek(week, weekEvents) {
    let totalSize = 7;
    const eventWeek = [];
    const { weekStart, weekEnd } = getWeekBounds(week);

    const dummyEvent = getDummyEvent(weekStart, weekEnd);
    totalSize -= dummyEvent.size || 0;

    for (let i = 0; i < weekEvents.length; i++) {
        const event = Object.assign({}, weekEvents[i]);

        const eventStartsBeforeWeek = event.startDate <= weekStart.date;
        const eventEndsAfterWeek = event.endDate >= weekEnd.date;

        const eventStartDay = event.startDate.substring(8);
        const eventEndDay = event.endDate.substring(8);

        const eventSharesStartDay = weekEvents[i - 1] && event.startDate === weekEvents[i - 1].endDate;
        const eventSharesEndDay = weekEvents[i + 1] && event.endDate === weekEvents[i + 1].startDate;

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
    // TODO: consider days with no event in between two events
    if (dummyEvent.size) {
        dummyEvent.start ? eventWeek.unshift(dummyEvent) : eventWeek.push(dummyEvent);
    }

    return eventWeek;
}

function getWeekBounds(week) {
    const weekStart = week.find((day) => day.date !== null);
    let weekEnd;
    for (let i = week.length - 1; i >= 0; i--) {
        if (week[i].date !== null) {
            weekEnd = week[i];
            break;
        }
    }

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

export { getEventBars, getEventWeek, getWeekBounds, getDummyEvent };
