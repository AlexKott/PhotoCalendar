import ajax, { API_URL} from '../_helpers/ajax.js';
import PhotoCache from './PhotoCache.js';
const PHOTOS_API = `${API_URL}/photos`;

const photoCache = new PhotoCache();

function getPhotosByDay(day) {
    return new Promise((resolve, reject) => {
        const month = day.substring(0, 7);

        if (!photoCache.doesMonthExist(month)) {
            getPhotosByMonth(month).then(() => {
                resolve(photoCache.getPhotosByDay(day));
            })
            .catch(error => console.log(error));
        } else {
            resolve(photoCache.getPhotosByDay(day));
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
                    photoCache.savePhotosByMonth(month, formattedPhotos);
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
            formattedResponse[date] = [];
            response[date].forEach((photo) => {
                const formattedPhoto = Object.assign({}, photo);
                formattedPhoto.thumbnailSrc = `${photo.path}/s150/${photo.fileName}`;
                formattedPhoto.src = `${photo.path}/s600/${photo.fileName}`;
                formattedPhoto.highQualitySrc = `${photo.path}/s1200/${photo.fileName}`;
                formattedResponse[date].push(formattedPhoto);
            });
        }
    }
    return formattedResponse;
}

export { getPhotosByDay, getPhotosByMonth, getPhotosByRange };
