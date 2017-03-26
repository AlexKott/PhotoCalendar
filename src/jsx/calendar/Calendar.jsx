import React from 'react';

import CalendarWeekContainer from './CalendarWeekContainer.jsx';
import EventBarContainer from './EventBarContainer.jsx';
import NavButton from '../app/NavButton.jsx';

class Calendar extends React.Component {
    componentDidMount() {
        this.props.onChangeMonth(0);
    }
    render() {
        const {
            isCalendarActive,
            thumbnails,
            eventBars,
            weeks,
            onChangeMonth
        } = this.props;
        return (
            <div>
                <NavButton direction="left" onClick={() => onChangeMonth(-1)} />

                <div className="calendar">
                    {weeks.map((week, index) => (
                        <div key={index} className="c-week">
                            <CalendarWeekContainer
                                week={week}
                                thumbnails={thumbnails}
                            />
                            <EventBarContainer
                                events={eventBars[index]}
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
