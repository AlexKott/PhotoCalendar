import { SET_ACTIVE_COMPONENT } from '../actions';
import { CALENDAR } from '../../js/constants.js';

const initialState = {
    activeComponent: CALENDAR,
};

export function app(state = initialState, action) {
    switch(action.type) {

        case SET_ACTIVE_COMPONENT:
            return Object.assign({}, state, { activeComponent: action.componentName });

        default:
            return state;
    }
}
