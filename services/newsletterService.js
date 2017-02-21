const fs = require('fs');
const path = require('path');
const doT = require('dot');
const sendmail = require('sendmail')({ silent: process.env.NODE_ENV === 'production' });
const MongoClient = require('mongodb').MongoClient;
const { dbUser, dbPassword, dbDomain } = require('../mongoConfig.json');
const dbUrl = `mongodb://${dbUser}:${dbPassword}@${dbDomain}`;

module.exports = {
    fetchMailAddresses() {
        return new Promise((resolve, reject) => {
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
    },
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
    },
    addUser(name, email) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(dbUrl, (connectionError, db) => {
                if (!connectionError) {
                    db
                        .collection('newsletterEmails')
                        .update({ email }, { $set: { name, email } }, { upsert: true }, (dbError, record, t) => {
                            if (!dbError) {
                                if (record.result.upserted) {
                                    resolve(201);
                                } else {
                                    resolve(304);
                                }
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
    }
};

function buildEmail(calendarUpdates, photoUpdates) {
    const template = fs.readFileSync(path.join(__dirname, '../newsletter/template.jst'));
    const templateFunction = doT.template(template);

    const photoDates = Object.keys(photoUpdates);
    let amountPhotos = 0;
    photoDates.forEach((date) => {
        amountPhotos += photoUpdates[date].media.length;
    });

    const emailData = {
        calendarUpdates,
        photoUpdates: {
            size: amountPhotos,
            teaser: photoUpdates[photoDates[0]].media[0]
        }
    };

    return templateFunction(emailData);
}
