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
        this.setMonthContent();
    }
    setMonthContent() {
        const monthString = this.state.selectedMonth.requestString;

        getPhotosByMonth(monthString).then((dailyThumbnails) => {
            this.setState({ dailyThumbnails });
        });
        getEventsByMonth(monthString).then((events) => {
            const weeks = buildEventWeeks(this.state.weeks, events);
            this.setState({ weeks });
        });
        getTextsByMonth(monthString).then((texts) => {
            this.setState({ texts });
        });

        this.props.setCalendarTitle(this.state.selectedMonth.displayName);
    }
    onChangeMonth(direction) {
        const selectedMonth = selectMonth((this.state.selectedMonth.month + direction), this.state.selectedMonth.year);
        const weeks = getWeeks(selectedMonth);
        this.setState({ weeks, selectedMonth });

        this.setMonthContent();
    }
    onFocusEvent(event) {
        this.setState({ focussedEvent: event.eventId });
    }
    onBlurEvent() {
        this.setState({ focussedEvent: null })
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
