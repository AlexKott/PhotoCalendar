import React from 'react';
import CalendarWeek from './CalendarWeek.jsx';
import EventBarContainer from './EventBarContainer.jsx';
import NavButton from './NavButton.jsx';
import { selectMonth, getDateString, getWeeks } from '../js/dateHelper.js';
import { getTextsByMonth } from '../js/textService.js';

class Calendar extends React.Component {
    componentDidMount() {
        this.props.onChangeMonth(0);
    }
    render() {
        const {
            isCalendarActive,
            weeks,
            thumbnails,
            eventBars,
            onChangeMonth
        } = this.props;
        return (
            <div className={isCalendarActive ? "calendar__wrapper" : "hidden"}>
                <NavButton direction="left" onClick={() => onChangeMonth(-1)} />
                <div className="calendar">
                    {weeks.map((week, index) => (
                        <div key={index} className="c-week">
                            <CalendarWeek
                                week={week}
                                dailyThumbnails={thumbnails}
                                onselectContent={this.props.selectContent}
                            />
                            <EventBarContainer
                                events={eventBars[index]}
                                onselectContent={this.props.selectContent}
                            />
                        </div>
                    ))}
                </div>
                <NavButton direction="right" onClick={() => onChangeMonth(1)} />
            </div>
        );
    }
}

export default Calendar;
