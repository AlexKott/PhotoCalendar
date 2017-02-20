const photoAdapter = require('../adapters/photoAdapter');
const dateHelper = require('../helpers/dateHelper');

module.exports = {
    getPhotosByDate(req, res) {
        let dateBounds;
        if (req.params.date.length === 7) { // date is a month (YYYY-MM)
            dateBounds = dateHelper.getMonthBounds(req.params.date, false);
        } else { // date is a day (YYYY-MM-DD)
            dateBounds = dateHelper.getDayBounds(req.params.date, false);
        }
        photoAdapter.getPhotos(dateBounds.startDate, dateBounds.endDate)
            .then(photos => res.status(200).send(photos))
            .catch(error => res.status(500).send(error));
    },
    getPhotosByRange(req, res) {
        const startDate = new Date(req.params.startDate);
        const endDateInclusive = new Date(req.params.endDate);
        const endDate = dateHelper.getDayBounds(endDateInclusive, false).endDate;
        photoAdapter.getPhotos(startDate, endDate)
            .then(photos => res.status(200).send(photos))
            .catch(error => res.status(500).send(error));
    }
};
