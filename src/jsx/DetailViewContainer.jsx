import React from 'react';
import { connect } from 'react-redux';

import * as actions from './actions';
import DetailView from './DetailView.jsx';
import { DETAIL_VIEW } from '../js/constants.js';

function mapStateToProps(state) {
    return {
        isDetailViewActive: state.app.activeComponent === DETAIL_VIEW,
        selectedDay: state.detailView.selectedDay,
        selectedEvent: state.detailView.selectedEvent,
        photos: state.detailView.photos,
        text: state.detailView.text
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onSelectDay: (dateString) => dispatch(actions.selectDay(dateString)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailView);
