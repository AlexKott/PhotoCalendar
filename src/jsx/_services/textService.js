import ajax, { API_URL } from '../_helpers/ajax.js';
import TextCache from './TextCache.js';
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

function getTextByDay(day) {
    return new Promise((resolve, reject) => {
        const month = day.substring(0, 7);

        if (!textCache.doesMonthExist(month)) {
            getTextsByMonth(month).then(() => {
                resolve(textCache.getTextByDay(day));
            })
            .catch(error => console.log(error));
        } else {
            resolve(textCache.getTextByDay(day));
        }
    });
}

function getTextsByMonth(month) {
    return new Promise((resolve, reject) => {
        const cachedTexts = textCache.getTextsByMonth(month);
        if (cachedTexts) {
            resolve(cachedTexts);
        } else {
            ajax(`${TEXTS_API}/${month}`, 'GET')
                .then((response) => {
                    textCache.saveTextsByMonth(month, response.data);
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

export { getText, getTextByDay, getTextsByMonth, postText, updateText };
