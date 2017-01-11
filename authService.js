const request = require('request-promise');
const picasaAuth = require('./picasaAuth.json');

const authOptions = {
    method: 'POST',
    uri: picasaAuth.endpoint + picasaAuth.route,
    form: {
        client_id: picasaAuth.client_id,
        client_secret: picasaAuth.client_secret,
        grant_type: picasaAuth.grant_type,
        refresh_token: picasaAuth.refresh_token
    }
};

let accessToken;
let tokenExpiryTime;

module.exports = {
    getAccessToken() {
        return new Promise((resolve, reject) => {
            const now = Date.now() / 1000;
            if (accessToken && tokenExpiryTime && now < tokenExpiryTime) {
                resolve(accessToken);
            } else {
                request(authOptions).then((response) => {
                    const parsedResponse = JSON.parse(response);
                    accessToken = parsedResponse.access_token;
                    tokenExpiryTime = now + parsedResponse.expires_in;
                    resolve(accessToken);
                });
            }
        });
    }
};
