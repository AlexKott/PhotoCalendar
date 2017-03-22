const commentAdapter = require('../adapters/commentAdapter');
const dateHelper = require('../helpers/dateHelper');

module.exports = {
    getCommentsById(req, res) {
        const isDate = dateHelper.isDateString(req.params.id);
        let commentPromise;

        if (isDate) {
            commentPromise = commentAdapter.getComments('date', req.params.id);
        } else {
            commentPromise = commentAdapter.getComments('event', null, req.params.id);
        }

        commentPromise
            .then(text => {
                if (!text) {
                    res.status(200).send();
                } else {
                    res.status(200).send(text);
                }
            })
            .catch(error => res.status(500).send(error));
    },
    saveComment(req, res) {
        const { type, authorName, authorEmail, html, date, eventId } = req.body;

        commentAdapter.saveComment(type, authorName, authorEmail, html, date, eventId)
            .then(response => res.status(200).send(response))
            .catch(error => res.status(500).send(error));
    }
}
