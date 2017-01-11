const app = require('express')();

const photoService = require('./photoService');

const port = 4040;

app.get('/photos', (req, res) => {
    photoService.getPhotos()
        .then((photos) => res.send(photos))
        .catch((error) => res.send(error));
});

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
