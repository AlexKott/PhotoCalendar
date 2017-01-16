const PHOTOS_API = `http://${window.location.host}/entries`;

function getPhotos(queryParams) {
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
                resolve(formatImageSrc(xhr.response));
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
