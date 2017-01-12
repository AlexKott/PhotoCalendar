const PHOTOS_API = `http://${window.location.host}/photos`;

export default {
    getPhotos(filters) {
        // TODO: use filters
        return new Promise(function(resolve, reject) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', PHOTOS_API);
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
}
