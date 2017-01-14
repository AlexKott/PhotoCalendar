const express = require('express');
const app = express();

const photoService = require('./photoService');

const port = 4040;

app.use(express.static('dist'));

app.get('/entries', (req, res) => {
    if (Object.keys(req.query).length === 0) {
        return res.status(400).send('Missing query parameters');
    }
    
    let getPhotos;
    if ({}.hasOwnProperty.call(req.query, 'month')) {
        getPhotos = () => photoService.getPhotosByMonth(req.query.month);
    } else if ({}.hasOwnProperty.call(req.query, 'selectedDate')) {
        getPhotos = () => photoService.getPhotosByDay(req.query.selectedDate);
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

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
