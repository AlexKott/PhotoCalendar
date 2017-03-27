import React from 'react';
import { connect } from 'react-redux';

import EventBar from './EventBar.jsx';

import * as actions from '../actions.js';

function mapStateToProps(state) {
    return {
        focussedEvent: state.calendar.focussedEvent,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onFocusEvent: (eventId) => dispatch(actions.setFocussedEvent(eventId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventBar);
