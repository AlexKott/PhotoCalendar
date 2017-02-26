let eventCache = null;

class EventCache {
    constructor() {
        if (!eventCache) {
            this.monthCache = {};
            eventCache = this;
        }
        return eventCache;
    }
    saveEventsByMonth(events) {
        this.monthCache = Object.assign({}, this.monthCache, events);
    }
    getEventsByMonth(month) {
        return this.monthCache[month];
    }
}

export default EventCache;
