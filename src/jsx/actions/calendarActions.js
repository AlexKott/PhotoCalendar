import * as dateHelper from '../../js/dateHelper.js';
import * as photoService from '../../js/photoService.js';
import * as eventService from '../../js/eventService.js';

// ACTION TYPES

export const SET_MONTH = 'SET_MONTH';
export const SET_LOADING_STATE = 'SET_LOADING_STATE';
export const SET_THUMBNAILS = 'SET_THUMBNAILS';
export const SET_EVENTS = 'SET_EVENTS';
export const SET_FOCUSSED_EVENT = 'SET_FOCUSSED_EVENT';

// ACTION CREATORS

/// PRIVATE
function setLoading(isLoading) {
    return { type: SET_LOADING_STATE, isLoading };
}

function setMonth(selectedMonth) {
    return { type: SET_MONTH, selectedMonth };
}

function setThumbnails(thumbnails) {
    return { type: SET_THUMBNAILS, thumbnails };
}

function setEvents(events) {
    return { type: SET_EVENTS, events };
}

function loadThumbnails(dateString) {
    return (dispatch, getState) => {
        return photoService.getPhotosByMonth(dateString)
            .then((thumbnails) => {
                dispatch(setThumbnails(thumbnails))
            });
    }
}
function loadEvents(dateString) {
    return (dispatch, getState) => {
        return eventService.getEventsByMonth(dateString)
            .then((events) => {
                dispatch(setEvents(events))
            });
    }
}

/// PUBLIC
export function setFocussedEvent(eventId) {
    return { type: SET_FOCUSSED_EVENT, eventId };
}

export function changeMonth(direction) {
    return (dispatch, getState) => {
        dispatch(setLoading(true));
        const selectedMonth = getState().calendar.selectedMonth;
        const newMonth = dateHelper.selectMonth(selectedMonth.month + direction, selectedMonth.year);
        dispatch(setMonth(newMonth));
        Promise.all([
            dispatch(loadThumbnails(newMonth.requestString)),
            dispatch(loadEvents(newMonth.requestString))
        ]).then(() => dispatch(setLoading(false)));
    }
}
