import React from 'react';
import Newsletter from './Newsletter.jsx';
import Header from './Header.jsx';
import CalendarContainer from './CalendarContainer.jsx';
import DetailView from './DetailView.jsx';
import About from './About.jsx';
import { getDateString } from '../js/dateHelper.js';
import { readCookie } from '../js/cookieService.js';

const DETAIL_VIEW = 'DETAIL_VIEW';
const CALENDAR = 'CALENDAR';
const ABOUT = 'ABOUT';

class Blog extends React.Component {
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
    showCalendar() {
        this.setState({ activeComponent: CALENDAR });
    }
    setTitle(title) {
        this.setState({ title });
    }
    setCalendarTitle(calendarTitle) {
        this.setState({ calendarTitle });
    }
    toggleAbout() {
        if (this.state.activeComponent !== ABOUT) {
            this.setState({
                lastComponent: this.state.activeComponent,
                activeComponent: ABOUT,
                lastTitle: this.state.title,
                title: 'About this CalendarPhotoBlogPage' });
        } else {
            this.setState({ activeComponent: this.state.lastComponent, title: this.state.lastTitle });
        }
    }

    render() {
        return(
            <div>
                {!this.state.hasSubscribedNewsletter && <Newsletter />}

                <Header
                    isCalendarActive={this.state.activeComponent === CALENDAR}
                    isAboutActive={this.state.activeComponent === ABOUT}
                    title={this.state.activeComponent === CALENDAR ? this.state.calendarTitle : this.state.title}
                    showCalendar={this.showCalendar.bind(this)}
                    toggleAbout={this.toggleAbout.bind(this)}
                />

                {this.state.activeComponent === ABOUT && <About />}
                <CalendarContainer
                    isCalendarActive={this.state.activeComponent === CALENDAR}
                    selectContent={this.selectContent.bind(this)}
                    setCalendarTitle={this.setCalendarTitle.bind(this)}
                />
                <DetailView
                    selectedContent={this.state.selectedContent}
                    selectContent={this.selectContent.bind(this)}
                    isElementActive={this.state.activeComponent === DETAIL_VIEW}
                    setTitle={this.setTitle.bind(this)}
                />
            </div>
        );
    }
}
/*
EXAMPLE PROPTYPE

Blog.propTypes = {
    title: React.PropTypes.string
};
*/

export default Blog;
