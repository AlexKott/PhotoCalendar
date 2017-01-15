const request = require('request-promise');
const parseXML = require('xml2js').parseString;
const authService = require('./authService');
const dateHelper = require('./dateHelper');
const picasaAuth = require('./picasaAuth.json');

module.exports = {
    requestPhotos(query) {
        return new Promise((resolveTop, rejectTop) => {
            const requestPromises = [];
            Promise.all(authService.getAccessTokens())
                .then((access_tokens) => {
                    access_tokens.forEach((access_token, id) => {
                        requestPromises.push(request({
                            uri: picasaAuth.clients[id].albumURL,
                            qs: Object.assign({}, { access_token }, query)
                        }));
                    });
                    Promise.all(requestPromises)
                        .then((responses) => {
                            const responsePromises = [];
                            responses.forEach((response) => {
                                responsePromises.push(new Promise((resolve) => {
                                    parseXML(response, function (err, parsedResponse) {
                                        resolve(reformatPicasaResponse(parsedResponse));
                                    });
                                }));
                            });
                            Promise.all(responsePromises)
                                .then((formattedResponses) => {
                                    resolveTop(mergeResponses(formattedResponses));
                                })
                                .catch(formatError => {
                                    console.log(formatError);
                                    rejectTop(formatError);
                                });
                        })
                        .catch(requestError => {
                            console.log(requestError);
                            rejectTop(requestError);
                        });
                })
                .catch(authError => {
                    console.log(authError);
                    rejectTop(authError);
                });
        });
    }
};

function mergeResponses(responses) {
    const singleResponse = {};
    responses.forEach((response) => {
        for (let date in response) {
            if ({}.hasOwnProperty.call(response, date)) {
                singleResponse[date] = singleResponse[date] || { media: [] };
                singleResponse[date].media = singleResponse[date].media
                    .concat(response[date].media)
                    .sort((a, b) => a.timestamp > b.timestamp ? 1 : -1);
            }
        }
    });
    return singleResponse;
}

function reformatPicasaResponse(response) {
    const dayObject = {};
    const formattedResponse = [];
    const entries = response.feed.entry;
    if (!entries) {
        return {};
    }
    entries.forEach((entry) => {
        const formattedEntry = {};
        const srcString = entry.content[0].$.src;
        const splitPosition = srcString.lastIndexOf('/');
        formattedEntry.path = srcString.slice(0, splitPosition);
        formattedEntry.fileName = srcString.slice(splitPosition + 1);
        formattedEntry.timestamp = entry['gphoto:timestamp'][0];
        formattedEntry.type = entry.content[0].$.type;
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
