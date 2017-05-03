import * as actions from './actions.js';
const ROUTER_LOCATION_CHANGED = 'ROUTER_LOCATION_CHANGED';

export const routerInterceptor = ({ getState, dispatch }) => (next) => (action) => {
    if (action.type === ROUTER_LOCATION_CHANGED) {
        const router = action.payload;
        const state = getState();
        ga('set', 'page', router.pathname);
        ga('send', 'pageview');
        if (router.result) {
            if (router.result.key === 'DAY') {
                dispatch(actions.selectDay(router.params.dateString));
            } else if (router.result.key === 'EVENT') {
                const eventId = router.params.eventId;
                const startDate = router.query.startDate.substring(0, 10);
                const endDate = router.query.endDate.substring(0, 10);
                const summary = router.query.summary;
                dispatch(actions.selectEvent(eventId, startDate, endDate, summary));
            }
        }
    }
    return next(action);
}
