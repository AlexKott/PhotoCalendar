const NodeCache = require('node-cache');
const dateHelper = require('./dateHelper');
const photoAdapter = require('./photoAdapter');

const photoCache = new NodeCache({ stdTTL: 3600 });

module.exports = {
    getPhotosByMonth(month) {
        const cachedPhotos = photoCache.get(month);
        if (cachedPhotos) {
            return new Promise(resolve => resolve(cachedPhotos));
        }

        const startDate = new Date(month);
        const endDate = (new Date(month)).setMonth(startDate.getMonth() + 1);
        const filters = buildTimeFilters(startDate, endDate);
        const fields = buildFields(filters);

        return photoAdapter
            .requestPhotos({ fields })
            .then((photos) =>{
                photoCache.set(month, photos);
                return new Promise(resolve => resolve(photos));
            })
            .catch(error => error);
    },
    getPhotosByDay(selectedDate) {
        const month = selectedDate.substring(0, 7);
        const cachedPhotos = photoCache.get(month);
        if (cachedPhotos) {
            const photoObj = {};
            photoObj[selectedDate] = cachedPhotos[selectedDate];
            return new Promise(resolve => resolve(photoObj));
        }

        const filters = buildTimeFilters(selectedDate, selectedDate);
        const fields = buildFields(filters);

        return photoAdapter.requestPhotos({ fields });
    },
    getPhotosByPeriod(startDate, endDate) {
        const filters = buildTimeFilters(startDate, endDate);
        const fields = buildFields(filters);

        return photoAdapter.requestPhotos({ fields });
    }
};

function buildTimeFilters(startDateString, endDateString) {
    const startStamp = (new Date(startDateString)).getTime();
    const endDate = (new Date(endDateString));
    endDate.setDate(endDate.getDate() + 1);
    const endStamp = endDate.getTime();

    return [
        `gphoto:timestamp>=${startStamp}`,
        `gphoto:timestamp<${endStamp}`,
    ];
}

function buildFields(filters) {
    let i = 0, filterString = '';
    filters.forEach((filter) => {
        if (i++) {
            filterString += ' and ';
        }
        filterString += filter;
    });

    return `entry[${filterString}](content,gphoto:timestamp)`;
}
