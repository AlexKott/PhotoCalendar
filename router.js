const express = require('express');
const router = express.Router();

const eventController = require('./controllers/eventController');
const textController = require('./controllers/textController');
const commentController = require('./controllers/commentController');
const photoController = require('./controllers/photoController');

const newsletterService = require('./services/newsletterService');

router.get('/events', eventController.getAllEvents);
router.get('/events/:month', eventController.getEventsByMonth);

router.get('/texts/:id', textController.getTextsById);
router.post('/texts', textController.saveText);
router.put('/texts/:id', textController.updateText);

router.get('/comments/:id', commentController.getCommentsById);
router.post('/comments', commentController.saveComment);

router.get('/photos/:month', photoController.getPhotosByMonth);
router.get('/photos/:startDate/:endDate', photoController.getPhotosByRange);

router.post('/newsletter/add', (req, res) => {
    newsletterService
        .addUser(req.body.name, req.body.email)
        .then(response => res.sendStatus(response))
        .catch(error => res.status(500).send(error));
});

module.exports = router;
