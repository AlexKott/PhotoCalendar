const photoAdapter = require('../adapters/photoAdapter');
const eventAdapter = require('../adapters/eventAdapter');
const emailService = require('./emailService');
const MongoClient = require('mongodb').MongoClient;
const { dbUser, dbPassword, dbDomain } = require('../mongoConfig.json');

const dbUrl = `mongodb://${dbUser}:${dbPassword}@${dbDomain}`;

const fetchMailAddresses = new Promise((resolve, reject) => {
    MongoClient.connect(dbUrl, (connectionError, db) => {
        if (!connectionError) {
            db
                .collection('newsletterEmails')
                .find({}, { _id: 0 }, (dbError, cursor) => {
                    if (!dbError) {
                        resolve(cursor.toArray());
                        db.close();
                    } else {
                        reject(dbError);
                    }
                });
        } else {
            reject(connectionError);
        }
    });
});

const updatePromises = [];

const endDate = new Date();
const startDate = new Date();
startDate.setDate(endDate.getDate() - 7);

updatePromises.push(eventAdapter.getEvents({ updatedMin: startDate }));
updatePromises.push(photoAdapter.getPhotos(startDate, endDate));
updatePromises.push(fetchMailAddresses);

Promise.all(updatePromises)
    .then((updates) => {
        const calendarUpdates = !updates[0] ? null : updates[0].filter((update) => {
            if (update.created < startDate.toISOString()) {
                return false;
            }
            return true;
        });
        const photoUpdates = updates[1] ? updates[1] : null;
        const recipients = updates[2];

        if (calendarUpdates || photoUpdates) {
            emailService.sendEmail(recipients, calendarUpdates, photoUpdates);
        } else {
            console.log(`No news, no newsletter at ${endDate}.`);
        }
    })
    .catch(error => console.log(error));
