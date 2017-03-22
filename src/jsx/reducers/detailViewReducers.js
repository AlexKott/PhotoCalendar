import {
    SET_DETAIL_LOADING,
    SET_SELECTED_DAY,
    SET_SELECTED_EVENT,
    SET_SELECTED_PHOTO_INDEX,
    SET_CONTENT,
    TOGGLE_SLIDESHOW,
    TOGGLE_COMMENTS
} from '../actions';

const initialState = {
    isSlideshowActive: false,
    isCommentsActive: false,
    selectedDay: null,
    selectedEvent: null,
    selectedPhotoIndex: null,
    photos: [],
    text: {},
    comments: [{ authorName: "test", content: "<p>also test</p>" }, { authorName: "Alex", content: "<p>wir sind cool</p>" }]
};

export function detailView(state = initialState, action) {
    switch(action.type) {

        case SET_SELECTED_DAY:
            return Object.assign({}, state, { selectedDay: action.selectedDay, selectedEvent: null });

        case SET_SELECTED_EVENT:
            return Object.assign({}, state, { selectedEvent: action.selectedEvent, selectedDay: null });

        case SET_SELECTED_PHOTO_INDEX:
            return Object.assign({}, state, { selectedPhotoIndex: action.selectedPhotoIndex });

        case SET_CONTENT:
            return Object.assign({}, state, { photos: action.photos, text: action.text || {} });

        case TOGGLE_SLIDESHOW:
            return Object.assign({}, state, { isSlideshowActive: action.isSlideshowActive });

        case TOGGLE_COMMENTS:
            return Object.assign({}, state, { isCommentsActive: !state.isCommentsActive });

        default:
            return state;
    }
}
