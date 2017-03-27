import React from 'react';
import { connect } from 'react-redux';

import Calendar from './Calendar.jsx';

import * as actions from '../actions.js';
import * as dateHelper from '../_helpers/dateHelper.js';
import * as eventBarHelper from '../_helpers/eventBarHelper.js';

function mapStateToProps(state) {
    const weeks = dateHelper.getWeeks(state.calendar.selectedMonth);
    return {
        thumbnails: state.calendar.thumbnails,
        texts: state.calendar.texts,
        eventBars: eventBarHelper.getEventBars(weeks, state.calendar.events),
        weeks
    }
}
function mapDispatchToProps(dispatch) {
    return {
        onChangeMonth: (month) => dispatch(actions.changeMonth(month))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
