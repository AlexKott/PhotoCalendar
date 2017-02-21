import ajax, { API_URL} from './ajax';
const PHOTOS_API = `${API_URL}/photos`;

function getPhotosByDate(date) {
    return new Promise((resolve, reject) => {
        ajax(`${PHOTOS_API}/${date}`, 'GET')
            .then(response => resolve(formatImageSrc(response.data)))
            .catch(error => reject(error));
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
                formattedPhoto.highQualitySrc = `${photo.path}/s900/${photo.fileName}`;
                formattedResponse[date].media.push(formattedPhoto);
            });
        }
    }
    return formattedResponse;
}

export { getPhotosByDate, getPhotosByRange };
