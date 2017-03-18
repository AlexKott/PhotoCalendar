import React from 'react';
import { connect } from 'react-redux';

import * as actions from './actions';
import * as dateHelper from '../js/dateHelper.js';
import { getEventBars } from '../js/eventBarHelper.js';
import Calendar from './Calendar.jsx';
import { CALENDAR } from '../js/constants.js';

function mapStateToProps(state) {
    const weeks = dateHelper.getWeeks(state.calendar.selectedMonth);
    return {
        isCalendarActive: state.app.activeComponent === CALENDAR,
        selectedMonth: state.calendar.selectedMonth,
        thumbnails: state.calendar.thumbnails,
        texts: state.calendar.texts,
        eventBars: getEventBars(weeks, state.calendar.events),
        weeks,
        isLoading: state.calendar.isLoading
    }
}
function mapDispatchToProps(dispatch) {
    return {
        onChangeMonth: (month) => dispatch(actions.changeMonth(month))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
