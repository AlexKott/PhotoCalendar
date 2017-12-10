const request = require('request-promise');
const parseXML = require('xml-js').xml2js;
const authService = require('../services/authService');
const dateHelper = require('../helpers/dateHelper');
const googleAuth = require('../googleAuth.json');

module.exports = {
    getPhotos(startDate, endDate) {
        let fields = 'entry'; // type of response
            fields += `[gphoto:timestamp>=${startDate.getTime()} and gphoto:timestamp<${endDate.getTime()}]`; // applied filters
            fields += '(media:group/media:content,gphoto:timestamp)'; // requested fields
        return new Promise((resolve, reject) => {
            const requestPromises = [];
            // authentication requests
            Promise.all(authService.getAccessTokens('picasa'))
                .then((access_tokens) => {
                    access_tokens.forEach((access_token, id) => {
                        googleAuth.clients[id].albumURL.forEach(uri => {
                            requestPromises.push(request({
                                uri,
                                qs: Object.assign({}, { access_token, fields })
                            }));
                        });
                    });
                    // picasa requests
                    Promise.all(requestPromises)
                        .then((responses) => {
                            const mediaDayObjects = [];
                            responses.forEach((response) => {
                                const parsedResponse = parseXML(response, { compact: true });
                                const filteredResponse = filterPicasaResponse(parsedResponse);
                                if (filteredResponse) {
                                    const mediaDayObject = buildDayObject(filteredResponse);
                                    mediaDayObjects.push(mediaDayObject);
                                }
                            });
                            const mergedDayObjects = mergeDayObjects(mediaDayObjects);
                            resolve(mergedDayObjects);
                        })
                        .catch(requestError => {
                            console.log(requestError);
                            reject(requestError);
                        });
                })
                .catch(authError => {
                    console.log(authError);
                    reject(authError);
                });
        });
    }
};

function filterPicasaResponse(response) {
    if (!response.feed.entry) {
        return null;
    }
    const filteredResponses = [];
    let photos;
    if (!response.feed.entry.hasOwnProperty('length')) {
        photos = [response.feed.entry];
    } else {
        photos = response.feed.entry;
    }

    photos.forEach((entry) => {
        const filteredEntry = {};
        const mediaContent = entry['media:group']['media:content'];
        const isVideo = {}.hasOwnProperty.call(mediaContent, 'length');
        let content, srcString;
        if (isVideo) {
            // try to select medium quality, else use low quality video
            content = mediaContent[2]._attributes || mediaContent[1]._attributes;
            filteredEntry.videoSrc = content.url;
            // need to take image url for thumbnail preview
            srcString = mediaContent[0]._attributes.url;
        } else {
            content = mediaContent._attributes;
            srcString = content.url;
        }

        const splitPosition = srcString.lastIndexOf('/');
        filteredEntry.path = srcString.slice(0, splitPosition);
        filteredEntry.fileName = srcString.slice(splitPosition + 1);

        filteredEntry.type = content.type;
        filteredEntry.height = content.height;
        filteredEntry.width = content.width;
        filteredEntry.ratio = content.width / content.height;

        filteredEntry.timestamp = entry['gphoto:timestamp']['_text'];
        filteredResponses.push(filteredEntry);
    });
    return filteredResponses;
}

function buildDayObject(filteredResponse) {
    const dayObject = {};
    filteredResponse.forEach((media) => {
        const date = new Date(parseInt(media.timestamp, 10));
        const dateString = dateHelper.getDateString(date);
        if (!{}.hasOwnProperty.call(dayObject, dateString)) {
            dayObject[dateString] = [];
        }
        dayObject[dateString].push(media);
    });
    return dayObject;
}

function mergeDayObjects(mediaDayObjects) {
    const singleResponse = {};
    mediaDayObjects.forEach((response) => {
        for (let date in response) {
            if ({}.hasOwnProperty.call(response, date)) {
                singleResponse[date] = singleResponse[date] || [];
                singleResponse[date] = singleResponse[date].concat(response[date])
                    .sort((a, b) => a.timestamp > b.timestamp ? 1 : -1);
            }
        }
    });
    return singleResponse;
}
