import React from 'react';

import CalendarWeek from './CalendarWeek.jsx';
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
            <div className="content-container">
                <NavButton direction="left" onClick={() => onChangeMonth(-1)} />

                {weeks.map((week, index) => (
                    <div key={index} className="week">
                        <CalendarWeek
                            week={week}
                            thumbnails={thumbnails}
                        />
                        <EventBarContainer
                            events={eventBars[index]}
                        />
                    </div>
                ))}

                <NavButton direction="right" onClick={() => onChangeMonth(1)} />
            </div>
        );
    }
}

export default Calendar;
