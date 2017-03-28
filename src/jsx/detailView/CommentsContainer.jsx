import React from 'react';
import { connect } from 'react-redux';

import Comments from './Comments.jsx';

import * as actions from '../actions.js';

function mapStateToProps(state) {
    return {
        isSendingComment: state.detailView.isSendingComment,
        comments: state.detailView.comments,
        authorName: state.detailView.commentInput.authorName,
        authorEmail: state.detailView.commentInput.authorEmail,
        quillEditor: state.detailView.commentInput.quillEditor,
        formValidity: state.detailView.commentInput.formValidity,
        error: state.detailView.commentInput.error
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onChangeName: (authorName) => dispatch(actions.setAuthorName(authorName)),
        onChangeEmail: (authorEmail) => dispatch(actions.setAuthorEmail(authorEmail)),
        onSetQuillEditor: (quillEditor) => dispatch(actions.setQuillEditor(quillEditor)),
        onSubmitComment: (event) => dispatch(actions.sendComment(event))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
