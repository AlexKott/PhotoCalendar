import ajax, { API_URL } from './ajax';
import TextCache from './TextCache';
const TEXTS_API = `${API_URL}/texts`;

const textCache = new TextCache();

function getText(id) {
    return new Promise((resolve, reject) => {
        const cachedText = textCache.getTextById(id);
        if (cachedText !== undefined) {
            resolve(cachedText);
        } else {
            ajax(`${TEXTS_API}/${id}`, 'GET')
                .then((response) => {
                    textCache.saveTextById({ [id]: response.data || null });
                    resolve(response.data);
                })
                .catch((error) => reject(error));
        }
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
