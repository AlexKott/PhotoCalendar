import * as actions from './actions.js';
const ROUTER_LOCATION_CHANGED = 'ROUTER_LOCATION_CHANGED';

export const routerInterceptor = ({ getState, dispatch }) => (next) => (action) => {
    if (action.type === ROUTER_LOCATION_CHANGED) {
        const router = action.payload;
        const state = getState();
        if (router.result) {
            if (router.result.key === 'DAY') {
                dispatch(actions.selectDay(router.params.dateString));
            } else if (router.result.key === 'EVENT') {
                const eventId = router.params.eventId;
                const selectedEvent = state.calendar.events.find((e) => e.eventId === eventId);
                dispatch(actions.selectEvent(selectedEvent));
            }
        }
    }
    return next(action);
}
