// ACTION TYPES

export const SET_MONTH = 'SET_MONTH';
export const CHANGE_MONTH = 'CHANGE_MONTH';


// ACTION CREATORS

export function setMonth(month) {
    return { type: SET_MONTH, month };
}

export function changeMonth(direction) {
    return { type: CHANGE_MONTH, direction };
}
