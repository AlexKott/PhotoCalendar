const textAdapter = require('../adapters/textAdapter');

module.exports = {
    saveText(options) {
        let saveMethod = 'saveDateText';
        const args = [options.html];
        if (options.type === 'date') {
            args.unshift(options.date);
        } else {
            saveMethod = 'saveEventText';
            args.unshift(options.eventId);
        }

        return new Promise((resolve, reject) => {
            textAdapter[saveMethod](...args)
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    },
    getTextByDate(date) {

    },
    getTextsByEvent(event) {

    }
};
