import React from 'react';
import CalendarWeek from './CalendarWeek.jsx';
import NavButton from './NavButton.jsx';
import { selectMonth, getDateString, getWeeks, buildEventWeeks } from '../js/dateHelper.js';
import { getPhotosByMonth } from '../js/photoService.js';
import { getEventsByMonth } from '../js/eventService.js';
import { getTextsByMonth } from '../js/textService.js';

class Calendar extends React.Component {
    constructor(props) {
        super(props);

        const selectedMonth = selectMonth();
        const weeks = getWeeks(selectedMonth);

        this.state = {
            selectedMonth,
            weeks,
            dailyThumbnails: {},
            texts: null,
        }
    }
    componentDidMount() {
        const month = this.state.selectedMonth;
        const weeks = this.state.weeks;

        getPhotosByMonth(month.requestString).then((photos) => {
            this.setState({ dailyThumbnails: photos });
        });
        getEventsByMonth(month.requestString).then((events) => {
            this.setState({ weeks: buildEventWeeks(weeks, events) });
        });
        getTextsByMonth(month.requestString).then((texts) => {
            this.setState({ texts });
        });
        this.props.setTitle(month.displayName);
        this.props.setCalendarTitle(month.displayName);
    }
    onFocusEvent(event) {
        this.setState({ focussedEvent: event.eventId });
    }
    onBlurEvent() {
        this.setState({ focussedEvent: null })
    }
    onChangeMonth(direction) {
        const selectedMonth = selectMonth((this.state.selectedMonth.month + direction), this.state.selectedMonth.year);
        const weeks = getWeeks(selectedMonth);
        this.setState({ weeks });

        getPhotosByMonth(selectedMonth.requestString).then((photos) => {
            this.setState({ dailyThumbnails: photos });
        });
        getEventsByMonth(selectedMonth.requestString).then((events) => {
            this.setState({ weeks: buildEventWeeks(weeks, events) });
        });
        getTextsByMonth(month.requestString).then((texts) => {
            this.setState({ texts });
        });

        this.setState({ selectedMonth });
        this.props.setTitle(selectedMonth.displayName);
        this.props.setCalendarTitle(selectedMonth.displayName);
    }
    render() {
        return (
            <div className={this.props.isCalendarActive ? "calendar__wrapper" : "hidden"}>
                <NavButton direction="left" onClick={() => this.onChangeMonth(-1)} />
                <div className="calendar">
                    {this.state.weeks.map((week, index) => (
                        <CalendarWeek
                            week={week}
                            key={index}
                            dailyThumbnails={this.state.dailyThumbnails}
                            onselectContent={this.props.selectContent}
                            focussedEvent={this.state.focussedEvent}
                            onFocusEvent={this.onFocusEvent.bind(this)}
                            onBlurEvent={this.onBlurEvent.bind(this)}
                        />
                    ))}
                </div>
                <NavButton direction="right" onClick={() => this.onChangeMonth(1)} />
            </div>
        );
    }
}

export default Calendar;
