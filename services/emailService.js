const fs = require('fs');
const path = require('path');
const sendmail = require('sendmail')({ silent: process.env.NODE_ENV === 'production' });
const doT = require('dot');

module.exports = {
    sendEmail(recipients, calendarUpdates, photoUpdates) {
        const from = 'Alina and Alex <no-reply@alexkott.com>';
        const to = recipients.map(r => r.email).join(', ');
        const subject = 'New updates from Alina and Alex';
        const html = buildEmail(calendarUpdates, photoUpdates);
        const now = new Date();

        sendmail({ from, to, subject, html }, (err, reply) => {
            if (err) {
                console.log(err && err.stack);
            } else {
                console.log(`Newsletter sent at ${now}.`);
            }
        });
    }
};

function buildEmail(calendarUpdates, photoUpdates) {
    const template = fs.readFileSync(path.join(__dirname, '../newsletter/template.jst'));
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
