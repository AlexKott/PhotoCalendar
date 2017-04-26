const commentAdapter = require('../adapters/commentAdapter');
const captchaService = require('../services/captchaService');
const newsletterService = require('../services/newsletterService');
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

        captchaService
            .validate(token)
            .then(result => {
                if (result.success) {
                    commentAdapter.saveComment(type, authorName, authorEmail, html, date, eventId)
                        .then(response => {
                            res.status(200).send(response);
                            commentAdapter.getComments(type, date, eventId).then((comments) => {
                                const subject = `New Comment by ${authorName}`;
                                const slug = type === 'date' ? `/day/${date}` : '';
                                const recipients = comments
                                    .filter(c => c.authorEmail !== authorEmail)
                                    .map(c => `${c.authorName} <${c.authorEmail}>`);
                                recipients.push('Alex Kott <alex.kott@mail.com>');

                                let content = mailHead;
                                content += '<h1 style="font-size: 24px; margin: 0 0 16px; padding: 4px 8px; background-color: #880011; color: #FBFBFB;">New comment on travel&sdot;alexkott&sdot;com</h1>';
                                content += `<h2 style="font-size: 18px; margin: 20px 0 4px 0; border-left: 4px solid #880011; padding-left: 4px;"><strong>${authorName}</strong> replied to your comment:</h2>`;
                                content += html;
                                content += `<p style="font-size: 14px; line-height: 1.46; margin: 8px 0 8px; padding: 0 8px;"><a  style="color: #880011; text-decoration: none; border-bottom: 1px solid currentColor;" onMouseOver="this.style.border='none'" onMouseOut="this.style.borderBottom='1px solid currentColor'" href="https://travel.alexkott.com${slug}">Click here</a> to see it on the website.</p>`;
                                content += mailFoot;
                                recipients.forEach(to => newsletterService.sendNotification(to, subject, content));
                            });
                        })
                        .catch(error => {
                            console.log(error);
                            res.status(500).send(error)});
                } else {
                    res.status(400).send(result['error-codes']);
                }
            })
            .catch(captchaError => {
                console.log(captchaError);
                res.status(500).send(captchaError);
            });
    }
}

// Temporary solution, use jst here.
const mailHead = `<html><head><meta charset="utf-8"><title>New Comment</title></head><body style="width: 100%; color: #222222; font-family: Helvetica, Arial, sans-serif; margin: 0; padding 0;"><div style="width: 100%; background-color: #777777; padding: 20px 0;"><div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #FBFBFB;">`;
const mailFoot = `</div></div></body></html>`;
