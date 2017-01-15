const request = require('request-promise');
const parseXML = require('xml2js').parseString;
const authService = require('../services/authService');
const dateHelper = require('../helpers/dateHelper');
const googleAuth = require('../googleAuth.json');

module.exports = {
    requestPhotos(query) {
        return new Promise((resolveTop, rejectTop) => {
            const requestPromises = [];
            Promise.all(authService.getAccessTokens())
                .then((access_tokens) => {
                    access_tokens.forEach((access_token, id) => {
                        requestPromises.push(request({
                            uri: googleAuth.clients[id].albumURL,
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

function reformatPicasaResponse(response) {
    const dayObject = {};
    const formattedResponse = [];
    const entries = response.feed.entry;
    if (!entries) {
        return {};
    }
    entries.forEach((entry) => {
        const formattedEntry = {};
        const content = entry['media:group'][0]['media:content'];
        const srcString = content[0].$.url;
        const splitPosition = srcString.lastIndexOf('/');
        formattedEntry.path = srcString.slice(0, splitPosition);
        formattedEntry.fileName = srcString.slice(splitPosition + 1);
        if (content.length > 1) { // content is video
            // try to select medium quality, else use low quality video
            const selectedContent = content[2].$ || content[1].$;
            formattedEntry.videoSrc = selectedContent.url;
            formattedEntry.type = selectedContent.type;
            formattedEntry.height = selectedContent.height;
            formattedEntry.width = selectedContent.width;
            formattedEntry.ratio = selectedContent.width / selectedContent.height;
        } else {
            formattedEntry.type = content[0].$.type;
            formattedEntry.height = content[0].$.height;
            formattedEntry.width = content[0].$.width;
            formattedEntry.ratio = content[0].$.width / content[0].$.height;
        }

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
