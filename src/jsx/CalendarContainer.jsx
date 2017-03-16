import React from 'react';
import { connect } from 'react-redux';

import * as actions from './actions.js';
import Calendar from './Calendar.jsx';

function mapStateToProps(state) {
    return {
        month: state.month.month
    }
}
function mapDispatchToProps(dispatch) {
    return {
        setMonth: (month) => dispatch(actions.setMonth(month))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
