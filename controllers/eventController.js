const eventAdapter = require('../adapters/eventAdapter');
const dateHelper = require('../helpers/dateHelper');

module.exports = {
    getAllEvents(req, res) {
        eventAdapter.getEvents()
            .then((events) => {
                res.status(200).send(events);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).send(error);
            });
    },
    getEventsByMonth(req, res) {
        const monthBounds = dateHelper.getMonthBounds(req.params.month, false);
        const timeFilters = {
            timeMin: monthBounds.startDate.toISOString(),
            timeMax: monthBounds.endDate.toISOString()
        };
        eventAdapter.getEvents(timeFilters)
            .then((events) => {
                res.status(200).send(events);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).send(error);
            });
    }
}
