let photoCache = null;

class PhotoCache {
    constructor() {
        if (!photoCache) {
            this.cache = {};
            photoCache = this;
        }
        return photoCache;
    }
    savePhotosByMonth(month, photos) {
        this.cache = Object.assign({}, this.cache, { [month]: photos });
    }
    getPhotosByMonth(month) {
        return this.cache[month];
    }
    getPhotosByDay(day) {
        const month = day.substring(0, 7);
        return this.cache[month][day];
    }
    doesMonthExist(month) {
        return {}.hasOwnProperty.call(this.cache, month);
    }
}

export default PhotoCache;
