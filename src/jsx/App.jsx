import React from 'react';

import About from './About.jsx';
import CalendarContainer from './CalendarContainer.jsx';
import DetailViewContainer from './DetailViewContainer.jsx';
import HeaderContainer from './HeaderContainer.jsx';
import Newsletter from './Newsletter.jsx';

import { ABOUT } from '../js/constants.js';

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
