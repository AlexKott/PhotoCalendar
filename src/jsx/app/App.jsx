import React from 'react';
import { Fragment } from 'redux-little-router';

import HeaderContainer from './HeaderContainer.jsx';
import CalendarContainer from '../calendar/CalendarContainer.jsx';
import DetailViewContainer from '../detailView/DetailViewContainer.jsx';
import About from './About.jsx';
import Admin from './Admin.jsx';

import { ABOUT } from '../_constants/appConstants.js';

export default function App({ router }) {
    return (
        <div>
            <HeaderContainer />

            <Fragment forRoute="/" withConditions={() => router.result && router.result.key === 'INDEX'}><CalendarContainer /></Fragment>
            <Fragment forRoute="/event/:eventId"><DetailViewContainer /></Fragment>
            <Fragment forRoute="/day/"><DetailViewContainer /></Fragment>
            <Fragment forRoute="/about"><About /></Fragment>

            <Fragment forRoute="/admin"><Admin /></Fragment>

            <Fragment forRoute="/" withConditions={() => !router.result}><div>notfound</div></Fragment>
        </div>
    );
}
