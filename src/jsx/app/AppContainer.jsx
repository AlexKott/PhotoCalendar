import React from 'react';
import { connect } from 'react-redux';

import App from './App.jsx';

import * as cookieService from '../_services/cookieService.js';

function mapStateToProps(state) {
    return {
        activeComponent: state.app.activeComponent,
        hasSubscribedNewsletter: cookieService.readCookie('subscribedNewsletter')
    }
}

export default connect(mapStateToProps)(App);
