import ajax, { API_URL } from './ajax';
const EVENTS_API = `${API_URL}/events`;

function getAllEvents() {
    return new Promise((resolve, reject) => {
        ajax(EVENTS_API, 'GET')
            .then(response => resolve(response.data))
            .catch(error => reject(error));
    });
}

function getEventsByMonth(month) {
    return new Promise((resolve, reject) => {
        ajax(`${EVENTS_API}/${month}`, 'GET')
            .then(response => resolve(response.data))
            .catch(error => reject(error));
    });
}

export { getAllEvents, getEventsByMonth };
