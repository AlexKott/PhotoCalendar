import ajax, { API_URL } from './ajax';
const TEXTS_API = `${API_URL}/texts`;

function getText(id) {
    return new Promise((resolve, reject) => {
        ajax(`${TEXTS_API}/${id}`, 'GET')
            .then(response => resolve(response.data))
            .catch((error) => {
                if (error.status === 404) {
                    resolve(null);
                } else {
                    reject(error);
                }
            });
    });
}

function postText(text) {
    return new Promise((resolve, reject) => {
        ajax(TEXTS_API, 'POST', text)
            .then(response => resolve(response.data))
            .catch(error => reject(error));
    });
}

function updateText(text) {
    const id = text.type === 'date' ? text.date : text.eventId;
    return new Promise((resolve, reject) => {
        ajax(`${TEXTS_API}/${id}`, 'PUT', text)
            .then(response => resolve(response.data))
            .catch(error => reject(error));
    });
}

export { getText, postText, updateText };
