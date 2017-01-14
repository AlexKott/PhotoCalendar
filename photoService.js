const request = require('request-promise');
const parseXML = require('xml2js').parseString;
const authService = require('./authService');
const dateHelper = require('./dateHelper');

const requestURI = 'https://picasaweb.google.com/data/feed/api/user/105349963594832046114/albumid/6297511860833036161';

module.exports = {
    getPhotos(startDate, endDate) {
        const startStamp = (new Date(startDate)).getTime();
        let endStamp;
        if (endDate) {
            endStamp = (new Date(endDate)).getTime() + (24 * 60 * 60 * 1000);
        } else {
            endStamp = startStamp + (24 * 60 * 60 * 1000);
        }
        let fields = 'entry[';
        const filters = [];
        if (startStamp) {
            filters.push(`gphoto:timestamp>=${startStamp}`);
        }
        if (endStamp) {
            filters.push(`gphoto:timestamp<${endStamp}`);
        }

        let i = 0;
        filters.forEach((filter) => {
            if (i++) {
                fields += ' and ';
            }
            fields += filter;
        });

        fields += '](content,gphoto:timestamp)';
        return new Promise((resolve, reject) => {
            authService.getAccessToken().then((token) => {
                request({
                    uri: requestURI,
                    qs: {
                        access_token: token,
                        fields,
                    },
                }).then((response) => {
                    parseXML(response, function (err, parsedResponse) {
                        resolve(formatPicasaResponse(parsedResponse));
                    });
                }).catch((error) => {
                    console.log(error);
                    reject(error);
                });
            });
        });
    },
};

function formatPicasaResponse(response) {
    const formattedResponse = [];
    const entries = response.feed.entry;
    entries.forEach((entry) => {
        const formattedEntry = Object.assign({}, entry.content[0].$);
        formattedEntry.timestamp = entry['gphoto:timestamp'][0];
        formattedResponse.push(formattedEntry);
    });
    return buildDayArray(formattedResponse);
}

function buildDayArray(input) {
    const dayArray = [];
    const dayObject = {};

    input.forEach((media) => {
        const date = new Date(parseInt(media.timestamp, 10));
        const dateString = dateHelper.getDateString(date);
        if (!{}.hasOwnProperty.call(dayObject, dateString)) {
            dayObject[dateString] = { media: [] };
        }
        dayObject[dateString].media.push(media);
    });

    for (let day in dayObject) {
        if ({}.hasOwnProperty.call(dayObject, day)) {
            dayArray.push({ date: day, media: dayObject[day].media });
        }
    }
    return dayArray.sort((prev, next) => prev.date > next.date ? 1 : -1);
}
