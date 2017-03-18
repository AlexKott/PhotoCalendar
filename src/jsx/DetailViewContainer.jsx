import React from 'react';
import { connect } from 'react-redux';

import DetailView from './DetailView.jsx';

function mapStateToProps(state) {
    return {
        selectedDay: state.detailView.selectedDay,
        selectedEvent: state.detailView.selectedEvent,
        photos: state.detailView.photos,
        text: state.detailView.text
    };
}

function mapDispatchToProps(dispatch) {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailView);
