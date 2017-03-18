import React from 'react';
import Newsletter from './Newsletter.jsx';
import HeaderContainer from './HeaderContainer.jsx';
import CalendarContainer from './CalendarContainer.jsx';
import DetailViewContainer from './DetailViewContainer.jsx';
import About from './About.jsx';
import { getDateString } from '../js/dateHelper.js';
import { readCookie } from '../js/cookieService.js';
import { ABOUT, DETAIL_VIEW } from '../js/constants.js';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedContent: null,
            hasSubscribedNewsletter: readCookie('subscribedNewsletter')
        }
    }
    selectContent(selectedContent) {
        this.setState({ selectedContent, activeComponent: DETAIL_VIEW });
    }

    render() {
        const {
            activeComponent
        } = this.props;
        return(
            <div>
                {!this.state.hasSubscribedNewsletter && <Newsletter />}

                <HeaderContainer />

                {activeComponent === ABOUT && <About />}
                <CalendarContainer
                    selectContent={this.selectContent.bind(this)}
                />
                <DetailViewContainer
                    selectedContent={this.state.selectedContent}
                    selectContent={this.selectContent.bind(this)}
                    isElementActive={activeComponent === DETAIL_VIEW}
                />
            </div>
        );
    }
}

export default App;
