import ajax, { API_URL } from '../_helpers/ajax.js';
import EventCache from './EventCache.js';
const EVENTS_API = `${API_URL}/events`;

const eventCache = new EventCache();

function getAllEvents() {
    return new Promise((resolve, reject) => {
        ajax(EVENTS_API, 'GET')
            .then(response => resolve(response.data))
            .catch(error => reject(error));
    });
}

function getEventsByMonth(month) {
    return new Promise((resolve, reject) => {
        const cachedEvents = eventCache.getEventsByMonth(month);
        if (cachedEvents) {
            resolve(cachedEvents);
        } else {
            ajax(`${EVENTS_API}/${month}`, 'GET')
                .then((response) => {
                    eventCache.saveEventsByMonth({ [month]: response.data });
                    resolve(response.data)
                })
                .catch(error => reject(error));
        }
    });
}

export { getAllEvents, getEventsByMonth };
