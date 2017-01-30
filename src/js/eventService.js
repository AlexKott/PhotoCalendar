import ajax, { API_URL } from './ajax';
const EVENTS_API = `${API_URL}/events`;

function getEvents(queryParams) {
    return new Promise((resolve, reject) => {
        ajax(EVENTS_API, queryParams)
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
}

export { getEvents };
