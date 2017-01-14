const request = require('request-promise');
const parseXML = require('xml2js').parseString;
const authService = require('./authService');
const dateHelper = require('./dateHelper');

const requestURI = 'https://picasaweb.google.com/data/feed/api/user/105349963594832046114/albumid/6297511860833036161';

module.exports = {
    requestPhotos(query) {
        return new Promise((resolve, reject) => {
            authService.getAccessToken().then((access_token) => {
                request({
                    uri: requestURI,
                    qs: Object.assign({}, { access_token }, query)
                }).then((response) => {
                    parseXML(response, function (err, parsedResponse) {
                        resolve(reformatPicasaResponse(parsedResponse));
                    });
                }).catch((error) => {
                    console.log(error);
                    reject(error);
                });
            });
        });
    }
};

function reformatPicasaResponse(response) {
    const dayObject = {};
    const formattedResponse = [];
    const entries = response.feed.entry;
    entries.forEach((entry) => {
        const formattedEntry = Object.assign({}, entry.content[0].$);
        formattedEntry.timestamp = entry['gphoto:timestamp'][0];
        formattedResponse.push(formattedEntry);
    });

    formattedResponse.forEach((media) => {
        const date = new Date(parseInt(media.timestamp, 10));
        const dateString = dateHelper.getDateString(date);
        if (!{}.hasOwnProperty.call(dayObject, dateString)) {
            dayObject[dateString] = { media: [] };
        }
        dayObject[dateString].media.push(media);
    });

    return dayObject;
}
