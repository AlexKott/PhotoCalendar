const fs = require('fs');
const path = require('path');
const sendmail = require('sendmail')({ silent: process.env.NODE_ENV === 'production' });
const doT = require('dot');

doT.templateSettings = { strip: true };

module.exports = {
    sendEmail(recipients, calendarUpdates, photoUpdates) {
        const now = new Date();
        sendmail({
            from: 'Alina and Alex <no-reply@alexkott.com>',
            to: recipients.map(r => r.email).join(', '),
            subject: 'New updates from Alina and Alex',
            html: buildEmail(calendarUpdates, photoUpdates)
        }, (err, reply) => {
            if (err) {
                console.log(err && err.stack);
            } else {
                console.log(`Newsletter sent at ${now}.`);
            }
        });
    }
};

function buildEmail(calendarUpdates, photoUpdates) {
    const template = fs.readFileSync(path.join(__dirname, 'template.jst'), 'utf-8');
    const templateFunction = doT.template(template);

    const photoDates = Object.keys(photoUpdates);
    const emailData = {
        calendarUpdates,
        photoUpdates: {
            size: photoDates.length,
            teaser: photoUpdates[photoDates[0]].media[0]
        }
    };

    return templateFunction(emailData);
}
