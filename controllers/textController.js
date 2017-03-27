const textAdapter = require('../adapters/textAdapter');
const dateHelper = require('../helpers/dateHelper');
const configPassword = require('../password.json').password;

module.exports = {
    getTextsById(req, res) {
        const isDate = dateHelper.isDateString(req.params.id);
        const isMonth = dateHelper.isMonthString(req.params.id);
        let textPromise;

        if (isDate) {
            textPromise = textAdapter.getText('date', req.params.id);
        } else if (isMonth) {
            let { startDate, endDate } = dateHelper.getMonthBounds(req.params.id);
            startDate = dateHelper.getDateString(startDate);
            endDate = dateHelper.getDateString(endDate);
            textPromise = textAdapter.getTextsByRange('date', startDate, endDate);
        } else {
            textPromise = textAdapter.getText('event', null, req.params.id);
        }

        textPromise
            .then(text => {
                if (!text) {
                    res.status(200).send();
                } else {
                    res.status(200).send(text);
                }
            })
            .catch(error => res.status(500).send(error));
    },
    saveText(req, res) {
        const { password, type, html, date, eventId, eventSummary } = req.body;
        if (password !== configPassword) {
            return res.status(401).send('wrong password!');
        }
        textAdapter.saveText(type, html, date, eventId, eventSummary)
            .then(response => res.status(200).send(response))
            .catch(error => res.status(500).send(error));
    },
    updateText(req, res) {
        const { password, type, html, date, eventId } = req.body;
        if (password !== configPassword) {
            return res.status(401).send('wrong password!');
        }
        textAdapter.updateText(type, html, date, eventId)
            .then(response => res.status(200).send(response))
            .catch(error => res.status(500).send(error));
    }
}
