const request = require('request-promise');
const captchaInfo = require('../googleAuth.json').captcha;

module.exports = {
    validate(token) {
        return new Promise((resolve, reject) => {
            request({
                method: 'POST',
                uri: captchaInfo.url,
                form: {
                    secret: captchaInfo.secret,
                    response: token
                }
            })
            .then(response => resolve(JSON.parse(response)))
            .catch(error => reject(error));
        });
    }
}
