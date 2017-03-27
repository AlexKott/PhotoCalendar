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
                    const filteredText = text.map(c => {
                        c.authorEmail = undefined;
                        return c;
                    });
                    res.status(200).send(filteredText);
                }
            })
            .catch(error => res.status(500).send(error));
    },
    saveComment(req, res) {
        const { type, authorName, authorEmail, html, date, eventId, token } = req.body;

        console.log(token);

        commentAdapter.saveComment(type, authorName, authorEmail, html, date, eventId)
            .then(response => res.status(200).send(response))
            .catch(error => res.status(500).send(error));
    }
}
