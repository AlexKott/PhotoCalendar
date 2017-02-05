const express = require('express');
const router = express.Router();
const path = require('path');

const calendarService = require('./services/calendarService');
const photoService = require('./services/photoService');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

router.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

router.get('/events', (req, res) => {
    if (Object.keys(req.query).length === 0) {
        return res.status(400).send('Missing query parameters');
    }
    calendarService.getEventsByMonth(req.query.month)
        .then(events => res.send(events))
        .catch(error => res.send(error));
});

router.get('/entries', (req, res) => {
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
