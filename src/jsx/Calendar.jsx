import React from 'react';
import CalendarWeek from './CalendarWeek.jsx';
import EventBar from './EventBar.jsx';
import NavButton from './NavButton.jsx';
import { selectMonth, getDateString, getWeeks } from '../js/dateHelper.js';
import { getPhotosByMonth } from '../js/photoService.js';
import { getEventsByMonth } from '../js/eventService.js';
import { getTextsByMonth } from '../js/textService.js';
import { getEventBars } from '../js/eventBarHelper.js';

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
            eventBars: [],
        }
    }
    componentDidMount() {
        this.setMonthContent(this.state.weeks, this.state.selectedMonth);
    }
    setMonthContent(weeks, month) {
        const monthString = month.requestString;

        getPhotosByMonth(monthString).then((dailyThumbnails) => {
            this.setState({ dailyThumbnails });
        });
        getEventsByMonth(monthString).then((events) => {
            this.setState({ eventBars: getEventBars(weeks, events) });
        });
        getTextsByMonth(monthString).then((texts) => {
            this.setState({ texts });
        });

        this.props.setCalendarTitle(month.displayName);
    }
    onChangeMonth(direction) {
        const selectedMonth = selectMonth((this.state.selectedMonth.month + direction), this.state.selectedMonth.year);
        const weeks = getWeeks(selectedMonth);
        this.setState({ weeks, selectedMonth });

        this.setMonthContent(weeks, selectedMonth);
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
                        <div key={index} className="c-week">
                            <CalendarWeek
                                week={week}
                                dailyThumbnails={this.state.dailyThumbnails}
                                onselectContent={this.props.selectContent}
                            />
                            <EventBar
                                events={this.state.eventBars[index]}
                                onselectContent={this.props.selectContent}
                                focussedEvent={this.state.focussedEvent}
                                onFocusEvent={this.onFocusEvent.bind(this)}
                                onBlurEvent={this.onBlurEvent.bind(this)}
                            />
                        </div>
                    ))}
                </div>
                <NavButton direction="right" onClick={() => this.onChangeMonth(1)} />
            </div>
        );
    }
}

export default Calendar;
