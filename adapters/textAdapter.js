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
    getTextsByRange(type, startDate, endDate, createdAt) {
        const collectionName = `${type}Texts`;
        const filterType = createdAt ? 'createdAt' : 'date';
        const filter = {};
        filter[filterType] = { $gte: startDate, $lte: endDate };

        return new Promise((resolve, reject) => {
            MongoClient.connect(dbUrl, (err, db) => {
                if (!err) {
                    db
                        .collection(collectionName)
                        .find(filter, { _id: 0 }, (dbError, cursor) => {
                            if (!dbError) {
                                resolve(cursor.toArray());
                                db.close();
                            } else {
                                reject(dbError);
                            }
                        })
                } else {
                    reject(err);
                }
            });
        });
    },
    saveText(type, content, date, eventId, eventSummary) {
        const collectionName = `${type}Texts`;
        const id = type === 'date' ? { date } : { eventId };
        const createdAt = updatedAt = (new Date()).getTime();
        const eventProps = type === 'event' ? { eventSummary } : null;

        return new Promise((resolve, reject) => {
            MongoClient.connect(dbUrl, (err, db) => {
                if (!err) {
                    db
                        .collection(collectionName)
                        .insertOne(Object.assign({}, { content, createdAt, updatedAt }, id, eventProps), () => resolve('ok'));
                } else {
                    reject(err);
                }
            });
        });
    },
    updateText(type, content, date, eventId) {
        const collectionName = `${type}Texts`;
        const id = type === 'date' ? { date } : { eventId };
        const updatedAt = (new Date()).getTime();

        return new Promise((resolve, reject) => {
            MongoClient.connect(dbUrl, (err, db) => {
                if (!err) {
                    db
                        .collection(collectionName)
                        .updateOne(id, { $set: { content, updatedAt }}, () => resolve('ok'));
                } else {
                    reject(err);
                }
            })
        });
    }
};
