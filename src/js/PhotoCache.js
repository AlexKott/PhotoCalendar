let photoCache = null;

class PhotoCache {
    constructor() {
        if (!photoCache) {
            this.monthCache = {};
            this.dayCache = {};
            photoCache = this;
        }
        return photoCache;
    }
    savePhotosByMonth(photos) {
        this.monthCache = Object.assign({}, this.monthCache, photos);
    }
    getPhotosByMonth(month) {
        return this.monthCache[month];
    }
    savePhotosByDay(photos) {
        this.dayCache = Object.assign({}, this.dayCache, photos);
    }
    getPhotosByDay(day) {
        return this.dayCache[day];
    }
}

export default PhotoCache;
