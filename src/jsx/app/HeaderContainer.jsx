import React from 'react';
import { connect } from 'react-redux';
import { goBack } from 'redux-little-router';

import Header from './Header.jsx';

import * as actions from '../actions.js';
import * as dateHelper from '../_helpers/dateHelper.js';
import { keys } from '../routes.js';

function mapStateToProps(state) {
    const key = state.router.result ? state.router.result.key : keys.DEFAULT;

    return {
        isCalendarActive: state.router.result && state.router.result.key === keys.INDEX,
        isAboutActive: state.router.result && state.router.result.key === keys.ABOUT,
        title: getTitle(key, state),
        numberOfComments: state.detailView.comments.length
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onCloseAbout: () => dispatch(goBack())
    }
}

function getTitle(key, state) {
    switch(key) {
        case keys.INDEX: return state.calendar.selectedMonth.displayName;
        case keys.EVENT: return state.detailView.selectedEvent.summary;
        case keys.DAY: return state.detailView.selectedDay.displayName;
        case keys.ABOUT: return 'About this PhotoCalendarBlogPage';
        case keys.ADMIN: return 'Admin';
        default: return 'Not found';
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
