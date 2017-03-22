import React from 'react';
import { connect } from 'react-redux';

import DetailView from './DetailView.jsx';

import * as actions from './actions';
import { DETAIL_VIEW } from '../js/constants.js';

function mapStateToProps(state) {
    return {
        isDetailViewActive: state.app.activeComponent === DETAIL_VIEW,
        isSlideshowActive: state.detailView.isSlideshowActive,
        selectedDay: state.detailView.selectedDay,
        selectedEvent: state.detailView.selectedEvent,
        photos: state.detailView.photos,
        text: state.detailView.text
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onSelectDay: (dateString) => dispatch(actions.selectDay(dateString)),
        onOpenSlideshow: (startPhotoIndex) => dispatch(actions.openSlideshow(startPhotoIndex))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailView);
