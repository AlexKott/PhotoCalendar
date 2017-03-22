import * as photoService from '../../js/photoService.js';
import * as textService from '../../js/textService.js';
import { setActiveComponent } from './appActions.js';
import { DETAIL_VIEW } from '../../js/constants.js';
import { findAdjacentDates } from '../../js/adjacentDateHelper.js';

// ACTION TYPES
export const SET_DETAIL_LOADING = 'SET_DETAIL_LOADING';
export const SET_SELECTED_DAY = 'SET_SELECTED_DAY';
export const SET_SELECTED_EVENT = 'SET_SELECTED_EVENT';
export const SET_SELECTED_PHOTO_INDEX = 'SET_SELECTED_PHOTO_INDEX';
export const SET_CONTENT = 'SET_CONTENT';
export const TOGGLE_SLIDESHOW = 'TOGGLE_SLIDESHOW';


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

function setSelectedPhotoIndex(selectedPhotoIndex) {
    return { type: SET_SELECTED_PHOTO_INDEX, selectedPhotoIndex };
}

function setContent(photos = [], text = {}) {
    return { type: SET_CONTENT, photos, text };
}

function setAdjacentDates(dateString) {
    return (dispatch) => {
        findAdjacentDates(dateString)
            .then((dates) => {
                dispatch(setSelectedDay(Object.assign({}, { dateString }, dates)));
            });
    }
}

function toggleSlideshow(isSlideshowActive) {
    return { type: TOGGLE_SLIDESHOW, isSlideshowActive };
}

/// PUBLIC
export function selectDay(dateString) {
    return (dispatch) => {
        dispatch(setSelectedDay({ dateString }));
        dispatch(setAdjacentDates(dateString));
        dispatch(setLoading(true));
        dispatch(setActiveComponent(DETAIL_VIEW));

        Promise.all([
            photoService.getPhotosByDay(dateString),
            textService.getTextByDay(dateString)
        ]).then((content) => {
            dispatch(setContent(content[0], content[1]));
            dispatch(setLoading(false));
        })
    }
}

export function selectEvent(selectedEvent) {
    return (dispatch) => {
        dispatch(setSelectedEvent(selectedEvent));
        dispatch(setLoading(true));
        dispatch(setActiveComponent(DETAIL_VIEW));

        Promise.all([
            photoService.getPhotosByRange(selectedEvent.startDate, selectedEvent.endDate),
            textService.getText(selectedEvent.eventId)
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

export function openSlideshow(startPhotoIndex) {
    document.querySelector('body').classList.add('no-scroll');
    return (dispatch) => {
        dispatch(setSelectedPhotoIndex(startPhotoIndex));
        dispatch(toggleSlideshow(true));
    }
}

export function closeSlideshow() {
    document.querySelector('body').classList.remove('no-scroll');
    return (dispatch) => {
        dispatch(setSelectedPhotoIndex(null));
        dispatch(toggleSlideshow(false));
    }
}

export function changePhoto(direction) {
    return (dispatch, getState) => {
        let nextPhotoIndex = getState().detailView.selectedPhotoIndex + direction;
        const lastPhotoIndex = getState().detailView.photos.length - 1;
        if (nextPhotoIndex > lastPhotoIndex) {
            nextPhotoIndex = 0;
        } else if (nextPhotoIndex < 0) {
            nextPhotoIndex = lastPhotoIndex;
        }
        dispatch(setSelectedPhotoIndex(nextPhotoIndex));
    }
}
