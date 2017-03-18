import React from 'react';
import Newsletter from './Newsletter.jsx';
import HeaderContainer from './HeaderContainer.jsx';
import CalendarContainer from './CalendarContainer.jsx';
import DetailViewContainer from './DetailViewContainer.jsx';
import About from './About.jsx';
import { getDateString } from '../js/dateHelper.js';
import { readCookie } from '../js/cookieService.js';

const DETAIL_VIEW = 'DETAIL_VIEW';
const CALENDAR = 'CALENDAR';
const ABOUT = 'ABOUT';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedContent: null,
            activeComponent: CALENDAR,
            lastComponent: '',
            calendarTitle: '',
            title: '',
            lastTitle: '',
            hasSubscribedNewsletter: readCookie('subscribedNewsletter')
        }
    }
    selectContent(selectedContent) {
        this.setState({ selectedContent, activeComponent: DETAIL_VIEW });
    }

    render() {
        return(
            <div>
                {!this.state.hasSubscribedNewsletter && <Newsletter />}

                <HeaderContainer />

                {this.state.activeComponent === ABOUT && <About />}
                <CalendarContainer
                    selectContent={this.selectContent.bind(this)}
                />
                <DetailViewContainer
                    selectedContent={this.state.selectedContent}
                    selectContent={this.selectContent.bind(this)}
                    isElementActive={this.state.activeComponent === DETAIL_VIEW}
                />
            </div>
        );
    }
}

export default App;
