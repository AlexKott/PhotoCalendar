const request = require('request-promise');
const authService = require('../services/authService');
const googleAuth = require('../googleAuth.json');

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
                    .then((events) => {
                        resolve(events);
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
