import {
    SET_DETAIL_LOADING,
    SET_SELECTED_DAY,
    SET_SELECTED_EVENT,
    SET_SELECTED_PHOTO_INDEX,
    SET_CONTENT,
    SET_AUTHOR_NAME,
    SET_AUTHOR_EMAIL,
    SET_QUILL_EDITOR,
    TOGGLE_SLIDESHOW,
    TOGGLE_COMMENTS
} from './_actions';

const initialState = {
    isSlideshowActive: false,
    isCommentsActive: false,
    selectedDay: null,
    selectedEvent: null,
    selectedPhotoIndex: null,
    photos: [],
    text: {},
    comments: [],
    commentInput: {
        authorName: '',
        authorEmail: '',
        quillEditor: null
    }
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
            return Object.assign({}, state, {
                photos: action.photos,
                text: action.text || {},
                comments: action.comments
            });

        case SET_AUTHOR_NAME:
            const commentInputName = Object.assign({}, state.commentInput, { authorName: action.authorName });
            return Object.assign({}, state, { commentInput: commentInputName });

        case SET_AUTHOR_EMAIL:
            const commentInputEmail = Object.assign({}, state.commentInput, { authorEmail: action.authorEmail });
            return Object.assign({}, state, { commentInput: commentInputEmail });

        case SET_QUILL_EDITOR:
            const commentInputQuill = Object.assign({}, state.commentInput, { quillEditor: action.quillEditor });
            return Object.assign({}, state, { commentInput: commentInputQuill });

        case TOGGLE_SLIDESHOW:
            return Object.assign({}, state, { isSlideshowActive: action.isSlideshowActive });

        case TOGGLE_COMMENTS:
            return Object.assign({}, state, { isCommentsActive: !state.isCommentsActive });

        default:
            return state;
    }
}
