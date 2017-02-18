const fs = require('fs');
const path = require('path');
const photoService = require('../services/photoService');
const calendarService = require('../services/calendarService');
const sendmail = require('sendmail')();

const updatePromises = [];

const endDate = new Date();
const startDate = new Date();
startDate.setDate(endDate.getDate() - 7);

updatePromises.push(calendarService.getAllEvents({ updatedMin: startDate }));
updatePromises.push(photoService.getPhotosByPeriod(startDate, endDate));

Promise.all(updatePromises)
    .then((updates) => {
        const photoUpdates = updates[1];

        const calendarUpdates = updates[0].filter((update) => {
            if (update.created < startDate.toISOString()) {
                return false;
            }
            return true;
        });

        if (calendarUpdates.length || photoUpdates) {
            const html = formatEmail(calendarUpdates, photoUpdates);
            sendEmail(html);
        }
    })
    .catch(error => console.log(error));

function formatEmail(calendarUpdates, photoUpdates) {
    const head = fs.readFileSync(path.join(__dirname, 'head.html'));
    const foot = fs.readFileSync(path.join(__dirname, 'foot.html'))
    let body = '';

    if (calendarUpdates.length === 1) {
        body += '<h2>A new destination has been chosen!</h2>';
        body += `<p>We added <strong>${calendarUpdates[0].summary}</strong> and will probably be there from ${calendarUpdates[0].startDate} until ${calendarUpdates[0].endDate}.</p>`;
    } else if (calendarUpdates > 1) {
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

function sendEmail(html) {
    sendmail({
        from: 'no-reply@alexkott.com',
        to: 'alex.kott@mail.com',
        subject: 'New updates from Alina and Alex',
        html
    }, (err, reply) => {
        console.log(err && err.stack);
        console.dir(reply);
    });
}
