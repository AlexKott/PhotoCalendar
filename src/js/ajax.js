function ajax(uri, query) {
    return new Promise((resolve, reject) => {
        const queryString = query ? buildQueryString(query) : '';
        const xhr = new XMLHttpRequest();
        xhr.open('GET', uri + queryString);
        xhr.responseType = 'json';
        xhr.onload = function onXhrLoad() {
            if (xhr.status === 200) {
                resolve(xhr.response);
            } else {
                reject('There was an error loading the images. (Server error)');
            }
        }
        xhr.onerror = function onXhrError() {
            reject('There was an error loading the images. (Request error)');
        }
        xhr.send();
    });
}

function buildQueryString(queryParams) {
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
    return encodeURI(queryString);
}

export default ajax;

const isLocalEnv = window.location.hostname === 'localhost';

export const API_URL = isLocalEnv ? 'http://localhost:4040' : window.location.host;
