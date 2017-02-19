import ajax, { API_URL} from './ajax';
const PHOTOS_API = `${API_URL}/photos`;

function getPhotos(queryParams) {
    return new Promise((resolve, reject) => {
        ajax(PHOTOS_API, 'GET', queryParams)
            .then(response => resolve(formatImageSrc(response)))
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

export { getPhotos };
