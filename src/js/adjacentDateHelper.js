import { getPhotosByDay } from './photoService.js';
import { getTextByDay } from './textService.js';
import { beginningOfTime } from './dateConstants.js';
import { getDateStringFromDate } from './dateHelper.js';

export function findAdjacentDates(dateString) {
    return Promise.all([
        setAdjacentDate(dateString, -1),
        setAdjacentDate(dateString, 1)
    ]).then(dates => ({ previousDate: dates[0], nextDate: dates[1] }));
}

function setAdjacentDate(dateString, direction) {
    const self = this;
    const earliestDate = new Date(beginningOfTime);
    const latestDate = new Date();

    function checkForContent(dateString, resolve) {
        let currentDateString;
        let currentDate = new Date(dateString);
        currentDate.setDate(currentDate.getDate() + direction);

        if (currentDate >= earliestDate && currentDate <= latestDate) {
            currentDateString = getDateStringFromDate(currentDate);

            Promise.all([getPhotosByDay(currentDateString), getTextByDay(currentDateString)])
                .then((results) => {
                    if (results[0] || results[1]) {
                        resolve(currentDateString);
                    } else {
                        checkForContent(currentDateString);
                    }
                }).catch(e => console.log(e));
        } else {
            resolve(null);
        }
    }

    return new Promise(resolve => checkForContent(dateString, resolve));
}
