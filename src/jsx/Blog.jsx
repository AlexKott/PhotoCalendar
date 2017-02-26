import React from 'react';
import Newsletter from './Newsletter.jsx';
import Header from './Header.jsx';
import Calendar from './Calendar.jsx';
import DetailView from './DetailView.jsx';
import About from './About.jsx';
import { getDateString } from '../js/dateHelper.js';
import { readCookie } from '../js/cookieService.js';

class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedContent: null,
            activeComponent: 'Calendar',
            lastComponent: '',
            calendarTitle: '',
            title: '',
            lastTitle: '',
            hasSubscribedNewsletter: readCookie('subscribedNewsletter')
        }
    }
    selectContent(selectedContent) {
        this.setState({ selectedContent, activeComponent: 'DetailView' });
    }
    showCalendar() {
        this.setState({ activeComponent: 'Calendar' });
    }
    setTitle(title) {
        this.setState({ title });
    }
    setCalendarTitle(calendarTitle) {
        this.setState({ calendarTitle });
    }
    toggleAbout() {
        if (this.state.activeComponent !== 'About') {
            this.setState({
                lastComponent: this.state.activeComponent,
                activeComponent: 'About',
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
                {this.state.activeComponent === 'About' && <About />}
                <Header
                    isCalendarActive={this.state.activeComponent === 'Calendar'}
                    isAboutActive={this.state.activeComponent === 'About'}
                    title={this.state.activeComponent === 'Calendar' ? this.state.calendarTitle : this.state.title}
                    showCalendar={this.showCalendar.bind(this)}
                    toggleAbout={this.toggleAbout.bind(this)}
                />
                <Calendar
                    isCalendarActive={this.state.activeComponent === 'Calendar'}
                    selectContent={this.selectContent.bind(this)}
                    setTitle={this.setTitle.bind(this)}
                    setCalendarTitle={this.setCalendarTitle.bind(this)}
                />
                <DetailView
                    selectedContent={this.state.selectedContent}
                    selectContent={this.selectContent.bind(this)}
                    isElementActive={this.state.activeComponent === 'DetailView'}
                    setTitle={this.setTitle.bind(this)}
                />
            </div>
        );
    }
}

export default Blog;
