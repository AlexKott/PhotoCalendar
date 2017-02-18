const request = require('request-promise');
const authService = require('../services/authService');
const googleAuth = require('../googleAuth.json');
const dateHelper = require('../helpers/dateHelper');

module.exports = {
    requestEvents(query) {
        return new Promise((resolve, reject) => {
            authService.getAccessTokens('calendar')[0]
                .then((access_token) => {
                    const calendarClient = googleAuth.clients.find(client => client.calendar);
                    request({
                        uri: calendarClient.calendarURL,
                        qs: Object.assign({}, { access_token }, query)
                    })
                    .then((response) => {
                        resolve(formatEvents(JSON.parse(response)));
                    })
                    .catch((requestError) => {
                        console.log(requestError);
                        reject(requestError);
                    })
                })
                .catch((authError) => {
                    console.log(authError);
                    reject(authError);
                });
        });
    }
};

function formatEvents(response) {
    const events = [];
    response.items.forEach((item) => {
        const summary = item.summary;
        const colorId = item.colorId || 0;
        const created = item.created;
        const eventId = item.id;
        const startDate = item.start.date || item.start.dateTime.substring(0, 10);
        let endDate;
        // shift the exclusive end.date provided by google and make it inclusive
        if (item.end.date) {
            const d = new Date(item.end.date);
            d.setDate(d.getDate() - 1);
            endDate = dateHelper.getDateString(d);
        } else {
            endDate = item.end.dateTime.substring(0, 10);
        }
        events.push({ summary, created, colorId, startDate, endDate, eventId });
    });
    return events;
}
