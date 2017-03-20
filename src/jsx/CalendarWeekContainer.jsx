import React from 'react';
import { connect } from 'react-redux';

import CalendarWeek from './CalendarWeek.jsx';

import * as actions from './actions';

function mapDispatchToProps(dispatch) {
    return {
        onSelectDay: (dayString) => dispatch(actions.selectDay(dayString))
    };
}

export default connect(null, mapDispatchToProps)(CalendarWeek);
