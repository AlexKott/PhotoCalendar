import { SET_MONTH, CHANGE_MONTH } from './actions.js';
import { selectMonth } from '../js/dateHelper.js';

const initialState = {
    month: {}
};

export function month(state = initialState, action) {
    switch(action.type) {

        case SET_MONTH:
            return Object.assign({}, state, { month: action.month });

        case CHANGE_MONTH:
            const year = state.month.year;
            const month = state.month.month + action.direction;
            return Object.assign({}, state, { month: selectMonth(month, year) });

        default:
            return state;
    }
}
