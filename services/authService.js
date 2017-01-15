const request = require('request-promise');
const googleAuth = require('../googleAuth.json');

function getAuthOptions(id) {
    return {
        method: 'POST',
        uri: googleAuth.auth.endpoint + googleAuth.auth.route,
        form: {
            client_id: googleAuth.clients[id].client_id,
            client_secret: googleAuth.clients[id].client_secret,
            grant_type: googleAuth.auth.grant_type,
            refresh_token: googleAuth.clients[id].refresh_token
        }
    };
};

let accessTokens = [];
let tokenExpiryTime = [];

module.exports = {
    getAccessTokens(service) {
        const clientsLength = googleAuth.clients.length;
        const promises = [];
        for (let i = 0; i < clientsLength; i++) {
            if (service && !googleAuth.clients[i][service]) {
                continue;
            }
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
