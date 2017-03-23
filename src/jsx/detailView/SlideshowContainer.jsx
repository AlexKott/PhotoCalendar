import React from 'react';
import { connect } from 'react-redux';

import Slideshow from './Slideshow.jsx';

import * as actions from '../actions.js';

function mapStateToProps(state) {
    return {
        photos: state.detailView.photos,
        selectedPhotoIndex: state.detailView.selectedPhotoIndex,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onCloseSlideshow: () => dispatch(actions.closeSlideshow()),
        onChangePhoto: (direction) => dispatch(actions.changePhoto(direction))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Slideshow);
