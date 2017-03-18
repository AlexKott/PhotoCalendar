import React from 'react';
import { connect } from 'react-redux';

import App from './App.jsx';

function mapStateToProps(state) {
    return {
        activeComponent: state.app.activeComponent,
    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
