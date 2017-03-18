import * as photoService from '../../js/photoService.js';
import * as textService from '../../js/textService.js';
import { setActiveComponent } from './appActions.js';
import { DETAIL_VIEW } from '../../js/constants.js';

// ACTION TYPES
export const SET_DETAIL_LOADING = 'SET_DETAIL_LOADING';
export const SET_SELECTED_DAY = 'SET_SELECTED_DAY';
export const SET_SELECTED_EVENT = 'SET_SELECTED_EVENT';
export const SET_CONTENT = 'SET_CONTENT';


// ACTION CREATORS
/// PRIVATE
function setLoading(isLoading) {
    return { type: SET_DETAIL_LOADING, isLoading };
}

function setSelectedDay(selectedDay) {
    return { type: SET_SELECTED_DAY, selectedDay };
}

function setSelectedEvent(selectedEvent) {
    return { type: SET_SELECTED_EVENT, selectedEvent };
}

function setContent(photos = [], text = {}) {
    return { type: SET_CONTENT, photos, text };
}

/// PUBLIC
export function selectDay(selectedDay) {
    return (dispatch, getState) => {
        dispatch(setSelectedDay(selectedDay));
        dispatch(setLoading(true));
        dispatch(setActiveComponent(DETAIL_VIEW));

        Promise.all([
            photoService.getPhotosByDay(selectedDay),
            textService.getTextByDay(selectedDay)
        ]).then((content) => {
            dispatch(setContent(content[0], content[1]));
            dispatch(setLoading(false));
        })
    }
}

export function selectEvent(selectedEvent) {
    return (dispatch, getState) => {
        dispatch(setSelectedEvent(selectedEvent));
        dispatch(setLoading(true));
        dispatch(setActiveComponent(DETAIL_VIEW));

        Promise.all([
            photoService.getPhotosByRange(selectedEvent.startDate, selectedEvent.endDate),
            textService.getText(selectedEvent)
        ]).then((content) => {
            const photos = [];
            for (let date in content[0]) {
                if ({}.hasOwnProperty.call(content[0], date)) {
                    photos.push(...content[0][date]);
                }
            }
            photos.sort((a, b) => a.timestamp > b.timestamp ? 1 : -1);
            dispatch(setContent(photos, content[1]));
            dispatch(setLoading(false));
        })
    }
}
