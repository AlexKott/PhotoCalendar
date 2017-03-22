const MongoClient = require('mongodb').MongoClient;
const { dbUser, dbPassword, dbDomain } = require('../mongoConfig.json');
const dbUrl = `mongodb://${dbUser}:${dbPassword}@${dbDomain}`;

module.exports = {
    getComments(type, date, eventId) {
        const collectionName = `${type}Comments`;
        const id = type === 'date' ? { date } : { eventId };

        return new Promise((resolve, reject) => {
            MongoClient.connect(dbUrl, (err, db) => {
                if (!err) {
                    db
                        .collection(collectionName)
                        .find(id, { _id: 0 }, (dbError, cursor) => {
                            if (!dbError) {
                                resolve(cursor.toArray());
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
    saveComment(type, authorName, authorEmail, content, date, eventId) {
        const collectionName = `${type}Comments`;
        const id = type === 'date' ? { date } : { eventId };
        const createdAt = (new Date()).getTime();

        return new Promise((resolve, reject) => {
            MongoClient.connect(dbUrl, (err, db) => {
                if (!err) {
                    db
                        .collection(collectionName)
                        .insertOne(Object.assign({}, { authorName, authorEmail, content, createdAt }, id), () => resolve('ok'));
                } else {
                    reject(err);
                }
            });
        });
    }
};
