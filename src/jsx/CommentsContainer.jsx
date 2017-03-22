import React from 'react';
import { connect } from 'react-redux';

import Comments from './Comments.jsx';

import * as actions from './actions';

function mapStateToProps(state) {
    return {
        isCommentsActive: state.detailView.isCommentsActive,
        comments: state.detailView.comments
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onToggleComments: () => dispatch(actions.toggleComments())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
