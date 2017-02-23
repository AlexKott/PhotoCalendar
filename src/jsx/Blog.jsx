import React from 'react';
import Newsletter from './Newsletter.jsx';
import Header from './Header.jsx';
import Calendar from './Calendar.jsx';
import DetailView from './DetailView.jsx';
import { getDateString } from '../js/dateHelper.js';

class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedElement: null,
            isCalendarActive: true,
            calendarTitle: '',
            title: ''
        }
    }
    selectElement(selectedElement) {
        this.setState({ selectedElement, isCalendarActive: false });
        console.log(selectedElement);
    }
    showCalendar() {
        this.setState({ isCalendarActive: true });
    }
    setTitle(title) {
        this.setState({ title });
    }
    setCalendarTitle(calendarTitle) {
        this.setState({ calendarTitle });
    }

    render() {
        return(
            <div>
                <Newsletter />
                <Header
                    isCalendarActive={this.state.isCalendarActive}
                    title={this.state.isCalendarActive ? this.state.calendarTitle : this.state.title}
                    showCalendar={this.showCalendar.bind(this)}
                />
                <Calendar
                    isCalendarActive={this.state.isCalendarActive}
                    selectElement={this.selectElement.bind(this)}
                    setTitle={this.setTitle.bind(this)}
                    setCalendarTitle={this.setCalendarTitle.bind(this)}
                />
                <DetailView
                    selectedElement={this.state.selectedElement}
                    isCalendarActive={this.state.isCalendarActive}
                    setTitle={this.setTitle.bind(this)}
                />
            </div>
        );
    }
}

export default Blog;
