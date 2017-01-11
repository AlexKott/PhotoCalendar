const request = require('request-promise');
const parseXML = require('xml2js').parseString;
const authService = require('./authService');

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
    return formattedResponse;
}
