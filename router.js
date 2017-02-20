const express = require('express');
const router = express.Router();
const path = require('path');

const eventController = require('./controllers/eventController');
const textController = require('./controllers/textController');
const photoController = require('./controllers/photoController');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

router.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

router.get('/events', eventController.getAllEvents);
router.get('/events/:month', eventController.getEventsByMonth);

router.get('/texts', textController.getAllTexts);
router.get('/texts/:id', textController.getTextsById);
router.post('/texts', textController.saveText);

router.get('/photos', res => res.status(400).send('Please specify a range for your photo request.'));
router.get('/photos/:date', photoController.getPhotosByDate);
router.get('/photos/:startDate/:endDate', photoController.getPhotosByRange);

module.exports = router;
