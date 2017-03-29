const fs = require('fs');
const path = require('path');

const photoAdapter = require('../adapters/photoAdapter');
const eventAdapter = require('../adapters/eventAdapter');
const textAdapter = require('../adapters/textAdapter');
const newsletterService = require('../services/newsletterService');
const dateHelper = require('../helpers/dateHelper');

const updatePromises = [];

const endDate = new Date();
const startDate = new Date();
startDate.setDate(endDate.getDate() - 7);
endDate.setHours(23, 59, 59);

const startDateTime = startDate.getTime();
const endDateTime = endDate.getTime();

updatePromises.push(eventAdapter.getEvents({ updatedMin: startDate }));
updatePromises.push(photoAdapter.getPhotos(startDate, endDate));
updatePromises.push(textAdapter.getTextsByRange('date', startDateTime, endDateTime, true));
updatePromises.push(textAdapter.getTextsByRange('event', startDateTime, endDateTime, true));
updatePromises.push(new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, '/content/news.html'), 'utf-8', (err, result) => {
        if (err) {
            resolve();
        } else {
            resolve(result);
        }
    });
}));
updatePromises.push(newsletterService.fetchMailAddresses());

Promise.all(updatePromises)
    .then((updates) => {
        const calendarUpdates = !updates[0] ? null : updates[0].filter((update) => {
            if (update.created <= startDate.toISOString()) {
                return false;
            }
            return true;
        });
        const photoUpdates = updates[1] ? updates[1] : null;
        const textUpdates = { dateTexts: updates[2], eventTexts: updates[3] };
        const newsString = updates[4];
        const recipients = updates[5];

        if (calendarUpdates || photoUpdates || textUpdates.dateTexts || textUpdates.eventTexts || newsString) {
            newsletterService.sendEmail(recipients, calendarUpdates, photoUpdates, textUpdates, newsString);
            if (newsString) {
                const archiveName = dateHelper.getDateString(new Date());
                fs.renameSync(path.join(__dirname, '/content/news.html'), path.join(__dirname, `/content/archive/${archiveName}.html`));
            }
        } else {
            console.log(`No news, no newsletter at ${endDate}.`);
        }
    })
    .catch(error => console.log(error));
