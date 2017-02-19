const express = require('express');
const router = express.Router();
const path = require('path');

const eventController = require('./controllers/eventController');
const textController = require('./controllers/textController');

const photoService = require('./services/photoService');

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


router.get('/photos', (req, res) => {
    if (Object.keys(req.query).length === 0) {
        return res.status(400).send('Missing query parameters');
    }

    let getPhotos;
    // const useCache = {}.hasOwnProperty.call(req.query, 'useCache') ? req.query.useCache : true;
    const useCache = false;
    if ({}.hasOwnProperty.call(req.query, 'month')) {
        getPhotos = () => photoService.getPhotosByMonth(req.query.month, useCache);
    } else if ({}.hasOwnProperty.call(req.query, 'selectedDate')) {
        getPhotos = () => photoService.getPhotosByDay(req.query.selectedDate, useCache);
    } else {
        getPhotos = () => photoService.getPhotosByPeriod(req.query.startDate, req.query.endDate);
    }

    getPhotos()
        .then((photos) => res.send(photos))
        .catch((error) => {
            console.log(error);
            res.send(error)
        });
});

module.exports = router;
