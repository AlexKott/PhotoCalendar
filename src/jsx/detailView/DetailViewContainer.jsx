import React from 'react';
import { connect } from 'react-redux';

import DetailView from './DetailView.jsx';

import * as actions from '../actions.js';

function mapStateToProps(state) {
    return {
        isSlideshowActive: state.detailView.isSlideshowActive,
        isLoading: state.detailView.isLoading,
        selectedDay: state.detailView.selectedDay,
        photos: state.detailView.photos,
        text: state.detailView.text
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onOpenSlideshow: (startPhotoIndex) => dispatch(actions.openSlideshow(startPhotoIndex))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailView);
