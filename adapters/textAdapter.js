const MongoClient = require('mongodb').MongoClient;
const { dbUser, dbPassword, dbDomain } = require('../mongoConfig.json');
const dbUrl = `mongodb://${dbUser}:${dbPassword}@${dbDomain}`;

module.exports = {
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
