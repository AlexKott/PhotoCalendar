import React from 'react';

import About from './About.jsx';
import HeaderContainer from './HeaderContainer.jsx';
import Newsletter from './Newsletter.jsx';
import CalendarContainer from '../calendar/CalendarContainer.jsx';
import DetailViewContainer from '../detailView/DetailViewContainer.jsx';

import { ABOUT } from '../_constants/appConstants.js';

export default function App({ hasSubscribedNewsletter, activeComponent }) {
    return (
        <div>
            <HeaderContainer />

            {activeComponent === ABOUT && <About />}
            <CalendarContainer />
            <DetailViewContainer />

            {!hasSubscribedNewsletter && <Newsletter />}
        </div>
    );
}
