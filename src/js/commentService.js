import ajax, { API_URL } from './ajax';

const COMMENTS_API = `${API_URL}/comments`;

export function getComments(id) {
    return new Promise((resolve, reject) => {
        ajax(`${COMMENTS_API}/${id}`, 'GET')
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));
    });
}

export function saveComment(type, comment, date, eventId) {
    const { authorName, authorEmail, html } = comment;
    return new Promise((resolve, reject) => {
        ajax(COMMENTS_API, 'POST', { type, authorName, authorEmail, html, date, eventId })
            .then(response => resolve(response.data))
            .catch(error => reject(error));
    });
}
