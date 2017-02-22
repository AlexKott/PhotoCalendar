const express = require('express');
const router = express.Router();
const path = require('path');

const eventController = require('./controllers/eventController');
const textController = require('./controllers/textController');
const photoController = require('./controllers/photoController');

const newsletterService = require('./services/newsletterService');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

router.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

router.get('/events', eventController.getAllEvents);
router.get('/events/:month', eventController.getEventsByMonth);

router.get('/texts/:id', textController.getTextsById);
router.post('/texts', textController.saveText);
router.put('/texts/:id', textController.updateText);

router.get('/photos/:date', photoController.getPhotosByDate);
router.get('/photos/:startDate/:endDate', photoController.getPhotosByRange);

router.post('/newsletter/add', (req, res) => {
    newsletterService
        .addUser(req.body.name, req.body.email)
        .then(response => res.sendStatus(response))
        .catch(error => res.status(500).send(error));
});

module.exports = router;
