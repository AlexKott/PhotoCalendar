import {
    SET_DETAIL_LOADING,
    SET_SELECTED_DAY,
    SET_SELECTED_EVENT,
    SET_CONTENT,
    TOGGLE_SLIDESHOW
} from '../actions';

const initialState = {
    selectedDay: null,
    selectedEvent: null,
    photos: [],
    text: {}
};

export function detailView(state = initialState, action) {
    switch(action.type) {

        case SET_SELECTED_DAY:
            return Object.assign({}, state, { selectedDay: action.selectedDay, selectedEvent: null });

        case SET_SELECTED_EVENT:
            return Object.assign({}, state, { selectedEvent: action.selectedEvent, selectedDay: null });

        case SET_CONTENT:
            return Object.assign({}, state, { photos: action.photos, text: action.text || {} });

        case TOGGLE_SLIDESHOW:
            return Object.assign({}, state, { isSlideShowOpen: action.isSlideShowOpen, startPhotoId: action.startPhotoId || null });

        default:
            return state;
    }
}
