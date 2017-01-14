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
            }
        }
        queryString = encodeURI(queryString);

        const xhr = new XMLHttpRequest();
        xhr.open('GET', PHOTOS_API + queryString);
        xhr.responseType = 'json';
        xhr.onload = function() {
            if (xhr.status === 200) {
                resolve(xhr.response);
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

export { getPhotos };
