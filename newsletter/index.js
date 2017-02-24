const photoAdapter = require('../adapters/photoAdapter');
const eventAdapter = require('../adapters/eventAdapter');
const textAdapter = require('../adapters/textAdapter');
const newsletterService = require('../services/newsletterService');

const updatePromises = [];

const endDate = new Date();
const startDate = new Date();
startDate.setDate(endDate.getDate() - 7);
endDate.setHours(23, 59, 59);

updatePromises.push(eventAdapter.getEvents({ updatedMin: startDate }));
updatePromises.push(photoAdapter.getPhotos(startDate, endDate));
updatePromises.push(textAdapter.getTextsByRange('date', startDate, endDate));
updatePromises.push(textAdapter.getTextsByRange('event', startDate, endDate));
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
        const recipients = updates[4];

        if (calendarUpdates || photoUpdates || textUpdates.dateTexts || textUpdates.eventTexts) {
            newsletterService.sendEmail(recipients, calendarUpdates, photoUpdates, textUpdates);
        } else {
            console.log(`No news, no newsletter at ${endDate}.`);
        }
    })
    .catch(error => console.log(error));
