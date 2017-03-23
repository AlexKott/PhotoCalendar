// ACTION TYPES

export const SET_ACTIVE_COMPONENT = 'SET_ACTIVE_COMPONENT';

// ACTION CREATORS

export function setActiveComponent(componentName) {
    return { type: SET_ACTIVE_COMPONENT, componentName };
}
