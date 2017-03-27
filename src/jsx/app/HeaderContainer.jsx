import React from 'react';
import { connect } from 'react-redux';
import { goBack } from 'redux-little-router';

import Header from './Header.jsx';

import * as actions from '../actions.js';
import * as dateHelper from '../_helpers/dateHelper.js';
import { CALENDAR, DETAIL_VIEW, ABOUT } from '../_constants/appConstants.js';

function mapStateToProps(state) {
    return {
        isCalendarActive: state.router.result && state.router.result.key === 'INDEX',
        isAboutActive: state.router.result && state.router.result.key === 'ABOUT',
        title: ''
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onCloseAbout: () => dispatch(goBack())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
