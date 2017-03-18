import React from 'react';
import { connect } from 'react-redux';

import * as actions from './actions';
import Header from './Header.jsx';
import { CALENDAR, DETAIL_VIEW, ABOUT } from '../js/constants.js';

function mapStateToProps(state) {
    return {
        isCalendarActive: state.app.activeComponent === CALENDAR,
        isAboutActive: state.app.activeComponent === ABOUT,
        title: getTitle(state.app.activeComponent, state),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onShowCalendar: () => dispatch(actions.setActiveComponent(CALENDAR)),
        onShowAbout: () => dispatch(actions.setActiveComponent(ABOUT)),
        onHideAbout: () => dispatch(actions.setActiveComponent(CALENDAR)),
    }
}

function getTitle(activeComponent, state) {
    switch(activeComponent) {

        case CALENDAR:
            return state.calendar.selectedMonth.displayName;

        case DETAIL_VIEW:
            return 'Detail View - get title from state';

        case ABOUT:
            return 'About this PhotoCalendarBlogPage';

        default:
            return 'Welcome!';
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
