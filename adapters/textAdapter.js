const MongoClient = require('mongodb').MongoClient;
const { dbUser, dbPassword, dbDomain } = require('../mongoConfig.json');
const dbUrl = `mongodb://${dbUser}:${dbPassword}@${dbDomain}`;

module.exports = {
    getText(type, date, eventId) {
        const collectionName = `${type}Texts`;
        const id = type === 'date' ? { date } : { eventId };

        return new Promise((resolve, reject) => {
            MongoClient.connect(dbUrl, (err, db) => {
                if (!err) {
                    db
                        .collection(collectionName)
                        .findOne(id, { _id: 0 }, (dbError, text) => {
                            if (!dbError) {
                                resolve(text);
                                db.close();
                            } else {
                                reject(dbError);
                            }
                        });
                } else {
                    reject(err);
                }
            });
        });
    },
    saveText(type, content, date, eventId) {
        const collectionName = `${type}Texts`;
        const id = type === 'date' ? { date } : { eventId };

        return new Promise((resolve, reject) => {
            MongoClient.connect(dbUrl, (err, db) => {
                if (!err) {
                    db
                        .collection(collectionName)
                        .insertOne(Object.assign({}, { content }, id), () => resolve('ok'));
                } else {
                    reject(err);
                }
            });
        });
    },
    updateText(type, content, date, eventId) {
        const collectionName = `${type}Texts`;
        const id = type === 'date' ? { date } : { eventId };

        return new Promise((resolve, reject) => {
            MongoClient.connect(dbUrl, (err, db) => {
                if (!err) {
                    db
                        .collection(collectionName)
                        .updateOne(id, { $set: { content }}, () => resolve('ok'));
                } else {
                    reject(err);
                }
            })
        });
    }
};
