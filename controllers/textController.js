const textAdapter = require('../adapters/textAdapter');
const dateHelper = require('../helpers/dateHelper');

module.exports = {
    getAllTexts(req, res) {
        res.send('ok');
    },
    getTextsById(req, res) {
        res.send('ok');
    },
    saveText(req, res) {
        const { type, html, date, eventId } = req.body;
        textAdapter
            .saveText(type, html, date, eventId)
            .then(response => res.send(response))
            .catch(error => res.status(500).send(error));
    }
}
