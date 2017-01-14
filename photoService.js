const dateHelper = require('./dateHelper');
const photoAdapter = require('./photoAdapter');

module.exports = {
    getPhotosByMonth(month) {
        const startDate = new Date(month);
        const endDate = new Date(month);
        endDate.setMonth(endDate.getMonth() + 1);
    },
    getPhotosByDay(selectedDate) {
        const startStamp = (new Date(selectedDate)).getTime();
        const endStamp = (new Date(selectedDate)).getTime() + (24 * 60 * 60 * 1000);
        const filters = [
            `gphoto:timestamp>=${startStamp}`,
            `gphoto:timestamp<${endStamp}`,
        ];
        const fields = buildFields(filters);

        return photoAdapter.requestPhotos({ fields });
    },
    getPhotosByPeriod(startDate, endDate) {
        const startStamp = (new Date(startDate)).getTime();
        const endStamp = (new Date(endDate)).getTime() + (24 * 60 * 60 * 1000);
        const filters = [
            `gphoto:timestamp>=${startStamp}`,
            `gphoto:timestamp<${endStamp}`,
        ];
        const fields = buildFields(filters);

        return photoAdapter.requestPhotos({ fields });
    }
};

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
