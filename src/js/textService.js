import ajax, { API_URL } from './ajax';
const TEXTS_API = `${API_URL}/texts`;

function postText(text) {
    return new Promise((resolve, reject) => {
        ajax(TEXTS_API, 'POST', text)
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
}

export { postText };
