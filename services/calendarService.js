const calendarAdapter = require('../adapters/calendarAdapter');

module.exports = {
    getEventsByMonth(month) {
        return new Promise((resolve, reject) => {
            const startDate = new Date(month);
            const endDate = new Date(month);
            endDate.setMonth(endDate.getMonth() + 1);

            const timeFilters = buildTimeFilters(startDate, endDate);

            calendarAdapter.requestEvents(timeFilters)
                .then((events) => {
                    resolve(events);
                })
                .catch(requestError => {
                    console.log(requestError);
                    reject(requestError);
                });
        });
    },
    getAllEvents() {
        return new Promise((resolve, reject) => {
            calendarAdapter.requestEvents(null)
                .then((events) => {
                    resolve(events);
                })
                .catch(requestError => {
                    console.log(requestError);
                    reject(requestError);
                });
        });
    }
};

function buildTimeFilters(startDate, endDate) {
    return {
        timeMin: startDate.toISOString(),
        timeMax: endDate.toISOString()
    }
}
