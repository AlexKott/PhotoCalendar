function ajax(url, method, data) {
    return new Promise((resolve, reject) => {
        let uri = url;
        let postData;
        if (method === 'GET') {
            const queryString = data ? buildQueryString(data) : '';
            uri += queryString;
        } else if (method === 'POST' || method === 'PUT') {
            postData = data;
        }

        const xhr = new XMLHttpRequest();
        xhr.open(method, uri);
        xhr.responseType = 'json';
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onload = function onXhrLoad() {
            if (xhr.status < 400) {
                resolve({ data: xhr.response, status: xhr.status });
            } else {
                reject({ message: 'There was an error processing the request. (Server error)', status: xhr.status });
            }
        }
        xhr.onerror = function onXhrError() {
            reject('There was an error processing the request. (Request error)');
        }
        xhr.send(JSON.stringify(postData));
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

export const API_URL = isLocalEnv ? 'http://localhost:4040' : `${window.location.protocol}//${window.location.host}`;
