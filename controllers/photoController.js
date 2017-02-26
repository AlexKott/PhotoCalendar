const photoAdapter = require('../adapters/photoAdapter');
const dateHelper = require('../helpers/dateHelper');

module.exports = {
    getPhotosByMonth(req, res) {
        const monthBounds = dateHelper.getMonthBounds(req.params.month, false);
        photoAdapter.getPhotos(monthBounds.startDate, monthBounds.endDate)
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
