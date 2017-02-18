const fs = require('fs');
const path = require('path');
const sendmail = require('sendmail')({ silent: process.env.NODE_ENV === 'production' });

module.exports = {
    sendEmail(recipients, calendarUpdates, photoUpdates) {
        const now = new Date();
        sendmail({
            from: 'Alina and Alex <no-reply@alexkott.com>',
            to: recipients.map(r => r.email).join(', '),
            subject: 'New updates from Alina and Alex',
            html: formatEmail(calendarUpdates, photoUpdates)
        }, (err, reply) => {
            if (err) {
                console.log(err && err.stack);
            } else {
                console.log(`Newsletter sent at ${now}.`);
            }
        });
    }
};

function formatEmail(calendarUpdates, photoUpdates) {
    const head = fs.readFileSync(path.join(__dirname, 'head.html'));
    const foot = fs.readFileSync(path.join(__dirname, 'foot.html'))
    let body = '';

    if (calendarUpdates && calendarUpdates.length === 1) {
        body += '<h2>A new destination has been chosen!</h2>';
        body += `<p>We added <strong>${calendarUpdates[0].summary}</strong> and will probably be there from ${calendarUpdates[0].startDate} until ${calendarUpdates[0].endDate}.</p>`;
    } else if (calendarUpdates && calendarUpdates.length > 1) {
        const destinations = calendarUpdates.map(a => a.summary).join(' and ');
        body += '<h2>Some new destination have been chosen!</h2>';
        body += `<p>We added <strong>${destinations}</strong>. How exciting!</p>`;
    }
    if (photoUpdates) {
        const photoDates = Object.keys(photoUpdates);
        const examplePhoto = photoUpdates[photoDates[0]].media[0];
        body += '<h2>We added some new photos</h2>';
        body += `<p>In the last week we added ${photoDates.length} new photos. Here's a teaser:</p>`;
        body += `<img src="${examplePhoto.path}/${examplePhoto.fileName}" width="${examplePhoto.width}" height="${examplePhoto.height}" />`;
    }
    body += '<p>Go check it out at <a href="https://travel.alexkott.com">the website</a></p>';
    return head + body + foot;
}
