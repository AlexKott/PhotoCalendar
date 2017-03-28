import * as photoService from '../_services/photoService.js';
import * as textService from '../_services/textService.js';
import * as commentService from '../_services/commentService.js';
import { setActiveComponent } from '../actions.js';
import { findAdjacentDates } from '../_helpers/adjacentDateHelper.js';
import { getDisplayDay } from '../_helpers/dateHelper.js';

// ACTION TYPES
export const SET_AUTHOR_EMAIL = 'SET_AUTHOR_EMAIL';
export const SET_AUTHOR_NAME = 'SET_AUTHOR_NAME';
export const SET_CONTENT = 'SET_CONTENT';
export const SET_DETAIL_LOADING = 'SET_DETAIL_LOADING';
export const SET_FORM_VALIDITY = 'SET_FORM_VALIDITY';
export const SET_QUILL_EDITOR = 'SET_QUILL_EDITOR';
export const SET_SELECTED_DAY = 'SET_SELECTED_DAY';
export const SET_SELECTED_EVENT = 'SET_SELECTED_EVENT';
export const SET_SELECTED_PHOTO_INDEX = 'SET_SELECTED_PHOTO_INDEX';
export const SET_SENDING_COMMENT = 'SET_SENDING_COMMENT';

export const COMMENT_ERROR = 'COMMENT_ERROR';
export const POSTED_COMMENT = 'POSTED_COMMENT';
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

function setSendingComment(isSendingComment) {
    return { type: SET_SENDING_COMMENT, isSendingComment };
}

function setContent(photos = [], text = {}, comments = []) {
    const dateComments = comments.map(c => {
        c.displayDate = getDisplayDay(c.createdAt);
        return c;
    })
    return { type: SET_CONTENT, photos, text, comments };
}

function postedComment(authorName, content) {
    return { type: POSTED_COMMENT, comment: { authorName, content, displayDate: 'now' } };
}

function showError(error) {
    return { type: COMMENT_ERROR, error };
}

function toggleSlideshow(isSlideshowActive) {
    return { type: TOGGLE_SLIDESHOW, isSlideshowActive };
}

function checkCommentValidity(authorEmail, authorName, text) {
    const action = {
        type: SET_FORM_VALIDITY,
        formValidity: {
            isValid: true,
            isEmailEmpty: false,
            isNameEmpty: false,
            isTextEmpty: false
        }
    };
    if (!authorEmail) {
        action.formValidity.isValid = false;
        action.formValidity.isEmailEmpty = true;
    }
    if (!authorName) {
        action.formValidity.isValid = false;
        action.formValidity.isNameEmpty = true;
    }
    if (!text) {
        action.formValidity.isValid = false;
        action.formValidity.isTextEmpty = true;
    }
    return action;
}

function setAdjacentDates(selectedDay) {
    return (dispatch) => {
        findAdjacentDates(selectedDay.dateString)
            .then((dates) => {
                dispatch(setSelectedDay(Object.assign({}, selectedDay, dates)));
            });
    }
}

/// PUBLIC
export function setAuthorEmail(authorEmail) {
    return { type: SET_AUTHOR_EMAIL, authorEmail };
}

export function setAuthorName(authorName) {
    return { type: SET_AUTHOR_NAME, authorName };
}

export function setQuillEditor(quillEditor) {
    return { type: SET_QUILL_EDITOR, quillEditor };
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

export function closeSlideshow() {
    document.querySelector('body').classList.remove('no-scroll');
    return (dispatch) => {
        dispatch(setSelectedPhotoIndex(null));
        dispatch(toggleSlideshow(false));
    }
}

export function openSlideshow(startPhotoIndex) {
    document.querySelector('body').classList.add('no-scroll');
    return (dispatch) => {
        dispatch(setSelectedPhotoIndex(startPhotoIndex));
        dispatch(toggleSlideshow(true));
    }
}

export function selectDay(dateString) {
    return (dispatch) => {
        const selectedDay = { dateString, displayName: getDisplayDay(dateString) };
        dispatch(setSelectedDay(selectedDay));
        dispatch(setAdjacentDates(selectedDay));
        dispatch(setLoading(true));

        Promise.all([
            photoService.getPhotosByDay(dateString),
            textService.getTextByDay(dateString),
            commentService.getComments(dateString)
        ]).then((content) => {
            dispatch(setContent(content[0], content[1], content[2]));
            dispatch(setLoading(false));
        })
    }
}

export function selectEvent(eventId, startDate, endDate, summary) {
    return (dispatch) => {
        dispatch(setSelectedEvent({ eventId, startDate, endDate, summary }));
        dispatch(setLoading(true));

        Promise.all([
            photoService.getPhotosByRange(startDate, endDate),
            textService.getText(eventId),
            commentService.getComments(eventId)
        ]).then((content) => {
            const photos = [];
            for (let date in content[0]) {
                if ({}.hasOwnProperty.call(content[0], date)) {
                    photos.push(...content[0][date]);
                }
            }
            photos.sort((a, b) => a.timestamp > b.timestamp ? 1 : -1);
            dispatch(setContent(photos, content[1], content[2]));
            dispatch(setLoading(false));
        })
    }
}

export function sendComment(event) {
    return (dispatch, getState) => {
        event.preventDefault();
        const detailState = getState().detailView;
        const { authorName, authorEmail } = detailState.commentInput;
        const text = detailState.commentInput.quillEditor.root.innerText.trim();
        const formVal = dispatch(checkCommentValidity(authorEmail, authorName, text)).formValidity;
        if (formVal.isValid) {
            dispatch(setSendingComment(true));
            const token = grecaptcha.getResponse();
            if (token) {
                dispatch(postComment(token));
            } else {
                grecaptcha.execute();
            }
        }
    }
}

export function postComment(token) {
    return (dispatch, getState) => {
        const detailState = getState().detailView;
        const { authorName, authorEmail } = detailState.commentInput;
        const html = detailState.commentInput.quillEditor.root.innerHTML;
        const type = detailState.selectedDay ? 'date' : 'event';

        const date = detailState.selectedDay ? detailState.selectedDay.dateString : null;
        const eventId = detailState.selectedEvent ? detailState.selectedEvent.eventId : null;

        commentService
            .saveComment(type, { authorName, authorEmail, html }, date, eventId, token)
            .then(() => {
                dispatch(postedComment(authorName, html));
                dispatch(setSendingComment(false));
            })
            .catch(() => {
                dispatch(showError('Something went wrong, please reload and try again. If this keeps happening, let us know!'));
                dispatch(setSendingComment(false));
            });
    }
}
