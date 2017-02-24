const textAdapter = require('../adapters/textAdapter');
const dateHelper = require('../helpers/dateHelper');

module.exports = {
    getTextsById(req, res) {
        const isDate = dateHelper.isDateString(req.params.id);
        let textPromise;
        if (isDate) {
            textPromise = textAdapter.getText('date', req.params.id);
        } else {
            textPromise = textAdapter.getText('event', null, req.params.id);
        }
        textPromise
            .then(text => {
                if (!text) {
                    res.sendStatus(404);
                } else {
                    res.status(200).send(text);
                }
            })
            .catch(error => res.status(500).send(error));
    },
    saveText(req, res) {
        const { type, html, date, eventId, eventSummary } = req.body;
        textAdapter.saveText(type, html, date, eventId, eventSummary)
            .then(response => res.status(200).send(response))
            .catch(error => res.status(500).send(error));
    },
    updateText(req, res) {
        const { type, html, date, eventId } = req.body;
        textAdapter.updateText(type, html, date, eventId)
            .then(response => res.status(200).send(response))
            .catch(error => res.status(500).send(error));
    }
}
