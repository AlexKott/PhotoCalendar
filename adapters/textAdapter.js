const MongoClient = require('mongodb').MongoClient;
const { dbUser, dbPassword, dbDomain } = require('../mongoConfig.json');
const dbUrl = `mongodb://${dbUser}:${dbPassword}@${dbDomain}`;

module.exports = {
    saveDateText(date, text) {
        console.log(date, text);
        return new Promise((resolve, reject) => {
            MongoClient.connect(dbUrl, (err, db) => {
                if (!err) {
                    db
                        .collection('dateTexts')
                        .insertOne(Object.assign({}, { text, date }), () => resolve('ok'));
                } else {
                    reject(err);
                }
            });
        });
    },
    saveEventText(eventId, text) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(dbUrl, (err, db) => {
                if (!err) {
                    db
                        .collection('eventTexts')
                        .insertOne(Object.assign({}, { text, eventId }), () => resolve('ok'));
                } else {
                    reject(err);
                }
            });
        });
    },
    updateText(info, text) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(dbUrl, (err, db) => {
                if (!err) {
                    db
                        .collection(info.type)
                        .updateOne({ textId: '' }, { $set: { isPending: false, path: data.path }})
                }
            })
        });
    }
};
