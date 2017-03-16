import React from 'react';
import CalendarWeek from './CalendarWeek.jsx';
import EventBar from './EventBar.jsx';
import NavButton from './NavButton.jsx';
import { selectMonth, getDateString, getWeeks } from '../js/dateHelper.js';
import { getTextsByMonth } from '../js/textService.js';

class Calendar extends React.Component {
    constructor(props) {
        super(props);

        const selectedMonth = selectMonth();

        this.state = {
            selectedMonth,
            dailyThumbnails: {},
            texts: null,
            eventBars: [],
        }
    }
    componentDidMount() {
        this.setMonthContent(this.state.weeks, this.state.selectedMonth);
        this.props.changeMonth(0);
    }
    setMonthContent(weeks, month) {
        const monthString = month.requestString;

        getTextsByMonth(monthString).then((texts) => {
            this.setState({ texts });
        });

        this.props.setCalendarTitle(month.displayName);
    }
    onFocusEvent(event) {
        this.setState({ focussedEvent: event.eventId });
    }
    onBlurEvent() {
        this.setState({ focussedEvent: null })
    }
    render() {
        const {
            isCalendarActive,
            weeks,
            changeMonth
        } = this.props;
        return (
            <div className={isCalendarActive ? "calendar__wrapper" : "hidden"}>
                <NavButton direction="left" onClick={() => changeMonth(-1)} />
                <div className="calendar">
                    {weeks.map((week, index) => (
                        <div key={index} className="c-week">
                            <CalendarWeek
                                week={week}
                                dailyThumbnails={this.props.thumbnails}
                                onselectContent={this.props.selectContent}
                            />
                            <EventBar
                                events={this.props.eventBars[index]}
                                onselectContent={this.props.selectContent}
                                focussedEvent={this.state.focussedEvent}
                                onFocusEvent={this.onFocusEvent.bind(this)}
                                onBlurEvent={this.onBlurEvent.bind(this)}
                            />
                        </div>
                    ))}
                </div>
                <NavButton direction="right" onClick={() => changeMonth(1)} />
            </div>
        );
    }
}

export default Calendar;
