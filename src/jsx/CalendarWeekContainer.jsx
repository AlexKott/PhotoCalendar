import React from 'react';
import { connect } from 'react-redux';

import * as actions from './actions';
import CalendarWeek from './CalendarWeek.jsx';

function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {
        onSelectDay: (dayString) => dispatch(actions.selectDay(dayString))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarWeek);
