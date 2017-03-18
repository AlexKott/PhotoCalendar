import { SET_MONTH, SET_LOADING_STATE, SET_THUMBNAILS, SET_EVENTS, SET_FOCUSSED_EVENT } from '../actions';
import * as dateHelper from '../../js/dateHelper.js';

const initialCalendarState = {
    selectedMonth: dateHelper.selectMonth(),
    thumbnails: {},
    texts: [],
    events: [],
    focussedEvent: '',
    isLoading: false
};

export function calendar(state = initialCalendarState, action) {
    switch(action.type) {

        case SET_MONTH:
            return Object.assign({}, state, { selectedMonth: action.selectedMonth });

        case SET_LOADING_STATE:
            return Object.assign({}, state, { isLoading: action.isLoading });

        case SET_THUMBNAILS:
            return Object.assign({}, state, { thumbnails: action.thumbnails });

        case SET_EVENTS:
            return Object.assign({}, state, { events: action.events });

        case SET_FOCUSSED_EVENT:
            return Object.assign({}, state, { focussedEvent: action.eventId });

        default:
            return state;
    }
}
