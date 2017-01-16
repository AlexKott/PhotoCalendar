import ajax from './ajax';
const EVENTS_API = `http://${window.location.host}/events`;

function getEvents(queryParams) {
    return new Promise((resolve, reject) => {
        ajax(EVENTS_API, queryParams)
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
}

export { getEvents };
