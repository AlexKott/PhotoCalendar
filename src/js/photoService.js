import ajax, { API_URL} from './ajax';
import PhotoCache from './photoCache';
const PHOTOS_API = `${API_URL}/photos`;

const photoCache = new PhotoCache();

function getPhotosByDay(day) {
    return new Promise((resolve, reject) => {
        const cachedPhotos = photoCache.getPhotosByDay(day)
            if (cachedPhotos) {
                resolve(cachedPhotos);
            } else {
                ajax(`${PHOTOS_API}/${day}`, 'GET')
                    .then((response) => {
                        const formattedPhotos = formatImageSrc(response.data);
                        photoCache.savePhotosByDay({ [day]: formattedPhotos });
                        resolve(formattedPhotos);
                    })
                    .catch(error => reject(error));
            }
    });
}

function getPhotosByMonth(month) {
    return new Promise((resolve, reject) => {
        const cachedPhotos = photoCache.getPhotosByMonth(month);
        if (cachedPhotos) {
            resolve(cachedPhotos);
        } else {
            ajax(`${PHOTOS_API}/${month}`, 'GET')
                .then((response) => {
                    const formattedPhotos = formatImageSrc(response.data);
                    photoCache.savePhotosByMonth({ [month]: formattedPhotos });
                    resolve(formattedPhotos);
                })
                .catch(error => reject(error));
        }
    });
}

function getPhotosByRange(startDate, endDate) {
    return new Promise((resolve, reject) => {
        ajax(`${PHOTOS_API}/${startDate}/${endDate}`, 'GET')
            .then(response => resolve(formatImageSrc(response.data)))
            .catch(error => reject(error));
    });
}

function formatImageSrc(response) {
    const formattedResponse = {};
    for (let date in response) {
        if ({}.hasOwnProperty.call(response, date)) {
            formattedResponse[date] = { media: [] };
            response[date].media.forEach((photo) => {
                const formattedPhoto = Object.assign({}, photo);
                formattedPhoto.thumbnailSrc = `${photo.path}/s150/${photo.fileName}`;
                formattedPhoto.src = `${photo.path}/s400/${photo.fileName}`;
                formattedPhoto.highQualitySrc = `${photo.path}/s1200/${photo.fileName}`;
                formattedResponse[date].media.push(formattedPhoto);
            });
        }
    }
    return formattedResponse;
}

export { getPhotosByDay, getPhotosByMonth, getPhotosByRange };
