const NodeCache = require('node-cache');
const dateHelper = require('../helpers/dateHelper');
const photoAdapter = require('../adapters/photoAdapter');

const photoCache = new NodeCache({ stdTTL: 3600 });

module.exports = {
    getPhotosByMonth(month) {
        const cachedPhotos = photoCache.get(month);
        if (cachedPhotos) {
            return new Promise(resolve => resolve(reducePhotoList(cachedPhotos)));
        }

        const startDate = new Date(month);
        let endDate = new Date(month)
        endDate.setMonth(startDate.getMonth() + 1);
        endDate.setDate(endDate.getDate() - 1);
        const filters = buildTimeFilters(startDate, endDate);
        const fields = buildFields(filters);

        return photoAdapter
            .requestPhotos({ fields })
            .then((photos) =>{
                photoCache.set(month, photos);
                return new Promise(resolve => resolve(reducePhotoList(photos)));
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

function reducePhotoList(photos) {
    const reducedList = {};
    for (let date in photos) {
        if ({}.hasOwnProperty.call(photos, date)) {
            reducedList[date] = { media: [] }
            const thumbnail = photos[date].media.find(media => media.type.indexOf('image') !== -1);
            if (!thumbnail) { // no images for this day, take first item (video)
                reducedList[date].media.push(photos[date].media[0]);
            } else {
                reducedList[date].media.push(thumbnail);
            }
        }
    }
    return reducedList;
}

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

    return `entry[${filterString}](media:group/media:content,gphoto:timestamp)`;
}
