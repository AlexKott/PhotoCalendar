const request = require('request-promise');
const parseXML = require('xml2js').parseString;
const authService = require('./authService');
const dateHelper = require('./dateHelper');

const requestURI = 'https://picasaweb.google.com/data/feed/api/user/105349963594832046114/albumid/6297847315379141633';
const fields = 'entry[gphoto:timestamp>1404932668000](content,gphoto:timestamp)';

module.exports = {
    getPhotos() {
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
        if (media.type.includes('image')) {
            dayObject[dateString].media.push({ type: 'image', src: media.src });
        }
    });

    for (let day in dayObject) {
        if ({}.hasOwnProperty.call(dayObject, day)) {
            dayArray.push({ date: day, media: dayObject[day].media });
        }
    }
    return dayArray.sort((prev, next) => prev.date > next.date ? 1 : -1);
}
