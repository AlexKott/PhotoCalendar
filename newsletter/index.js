const photoAdapter = require('../adapters/photoAdapter');
const eventAdapter = require('../adapters/eventAdapter');
const newsletterService = require('../services/newsletterService');

const updatePromises = [];

const endDate = new Date();
const startDate = new Date();
startDate.setDate(endDate.getDate() - 7);
endDate.setHours(23, 59, 59);

updatePromises.push(eventAdapter.getEvents({ updatedMin: startDate }));
updatePromises.push(photoAdapter.getPhotos(startDate, endDate));
updatePromises.push(fetchMailAddresses);

Promise.all(updatePromises)
    .then((updates) => {
        const calendarUpdates = !updates[0] ? null : updates[0].filter((update) => {
            if (update.created <= startDate.toISOString()) {
                return false;
            }
            return true;
        });
        const photoUpdates = updates[1] ? updates[1] : null;
        const recipients = updates[2];

        if (calendarUpdates || photoUpdates) {
            newsletterService.sendEmail(recipients, calendarUpdates, photoUpdates);
        } else {
            console.log(`No news, no newsletter at ${endDate}.`);
        }
    })
    .catch(error => console.log(error));
