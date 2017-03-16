const state = {
    header: {
        title: 'string',
        activeComponent: 'string'
    },
    calendar: {
        selectedMonth: {
            displayName: 'string',
            month: 'number',
            year: 'number',
            firstWeekday: 'number',
            numberOfDays: 'number',
            dateString: 'string'
        },
        thumbnails: [{
            date: 'string',
            thumbnailSource: 'string'
        }],
        texts: ['string(date)'],
        events: [{
            eventId: 'string',
            summary: 'string',
            startDate: 'string',
            endDate: 'string',
            colorId: 'number'
        }],
        focussedEvent: 'string(eventId)'
    }
}
