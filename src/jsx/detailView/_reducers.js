import {
    SET_DETAIL_LOADING,
    SET_SELECTED_DAY,
    SET_SELECTED_EVENT,
    SET_SELECTED_PHOTO_INDEX,
    SET_CONTENT,
    SET_AUTHOR_NAME,
    SET_AUTHOR_EMAIL,
    SET_QUILL_EDITOR,
    SET_FORM_VALIDITY,
    POSTED_COMMENT,
    COMMENT_ERROR,
    TOGGLE_SLIDESHOW
} from './_actions';

const initialState = {
    isSlideshowActive: false,
    selectedDay: null,
    selectedEvent: null,
    selectedPhotoIndex: null,
    photos: [],
    text: {},
    comments: [],
    commentInput: {
        authorName: '',
        authorEmail: '',
        quillEditor: null,
        formValidity: {
            isValid: false
        },
        error: ''
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
            const commentInputName = Object.assign({}, state.commentInput, {
                authorName: action.authorName,
                formValidity: { isValid: true }
            });
            return Object.assign({}, state, { commentInput: commentInputName });

        case SET_AUTHOR_EMAIL:
            const commentInputEmail = Object.assign({}, state.commentInput, {
                authorEmail: action.authorEmail,
                formValidity: { isValid: true }
            });
            return Object.assign({}, state, { commentInput: commentInputEmail });

        case SET_QUILL_EDITOR:
            const commentInputQuill = Object.assign({}, state.commentInput, {
                quillEditor: action.quillEditor,
                formValidity: { isValid: true }
            });
            return Object.assign({}, state, { commentInput: commentInputQuill });

        case SET_FORM_VALIDITY:
            const commentInputValidity = Object.assign({}, state.commentInput, { formValidity: action.formValidity });
            return Object.assign({}, state, { commentInput: commentInputValidity });

        case TOGGLE_SLIDESHOW:
            return Object.assign({}, state, { isSlideshowActive: action.isSlideshowActive });

        case POSTED_COMMENT:
            const commentInputPosted = Object.assign({}, state.commentInput, { authorName: '', authorEmail: '', error: '' });
            const comments = state.comments.slice();
            comments.push(action.comment);
            state.commentInput.quillEditor.root.innerText = '';

            return Object.assign({}, state, { comments, commentInput: commentInputPosted });

        case COMMENT_ERROR:
            const commentInputError = Object.assign({}, state.commentInput, { error: action.error });
            return Object.assign({}, state, { commentInput: commentInputError });

        default:
            return state;
    }
}
