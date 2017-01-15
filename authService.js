const request = require('request-promise');
const picasaAuth = require('./picasaAuth.json');

function getAuthOptions(id) {
    return {
        method: 'POST',
        uri: picasaAuth.endpoint + picasaAuth.route,
        form: {
            client_id: picasaAuth.clients[id].client_id,
            client_secret: picasaAuth.clients[id].client_secret,
            grant_type: picasaAuth.grant_type,
            refresh_token: picasaAuth.clients[id].refresh_token
        }
    };
};

let accessTokens = [];
let tokenExpiryTime = [];

module.exports = {
    getAccessTokens() {
        const clientsLength = picasaAuth.clients.length;
        const promises = [];
        for (let i = 0; i < clientsLength; i++) {
            promises.push(new Promise((resolve, reject) => {
                const now = Date.now() / 1000;
                if (accessTokens[i] && tokenExpiryTime[i] && now < tokenExpiryTime[i]) {
                    resolve(accessTokens[i]);
                } else {
                    request(getAuthOptions(i)).then((response) => {
                        const parsedResponse = JSON.parse(response);
                        accessTokens[i] = parsedResponse.access_token;
                        tokenExpiryTime[i] = now + parsedResponse.expires_in;
                        resolve(accessTokens[i]);
                    });
                }
            }));
        }
        return promises;
    }
};
