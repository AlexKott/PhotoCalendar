const PHOTOS_API = `http://${window.location.host}/entries`;

function getPhotos(queryParams, quality) {
    return new Promise(function(resolve, reject) {
        let queryString = '?';
        let i = 0;
        for (let key in queryParams) {
            if({}.hasOwnProperty.call(queryParams, key)) {
                if (i++) {
                    queryString += '&';
                }
                queryString += `${key}=${queryParams[key]}`;
                console.log(queryString);
            }
        }
        queryString = encodeURI(queryString);

        const xhr = new XMLHttpRequest();
        xhr.open('GET', PHOTOS_API + queryString);
        xhr.responseType = 'json';
        xhr.onload = function() {
            if (xhr.status === 200) {
                resolve(formatImageSrc(xhr.response, quality));
            } else {
                reject('There was an error loading the images. (Server error)');
            }
        }
        xhr.onerror = function() {
            reject('There was an error loading the images. (Request error)');
        }
        xhr.send();
    });
}

function formatImageSrc(response, quality) {
    const formattedResponse = {};
    for (let date in response) {
        if ({}.hasOwnProperty.call(response, date)) {
            formattedResponse[date] = { media: [] };
            response[date].media.forEach((photo) => {
                const formattedPhoto = {};
                formattedPhoto.src = `${photo.path}/${quality}/${photo.fileName}`;
                formattedPhoto.type = photo.type;
                formattedPhoto.timestamp = photo.timestamp;
                if (formattedPhoto.type.indexOf('video') !== -1) {
                    formattedPhoto.videoSrc = photo.videoSrc;
                }
                formattedResponse[date].media.push(formattedPhoto);
            });
        }
    }
    return formattedResponse;
}

export { getPhotos };
