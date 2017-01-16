import React from 'react';
import { getDateStringFromDate } from '../js/dateHelper.js';

class CalendarDay extends React.Component {
    render() {
        return (
            <div
                className={this.props.isSelected ? 'day day--selected' : 'day'}
                onClick={() => this.props.onSelectDay(this.props.date)}
            >
                <span>{this.props.displayNumber}</span>
                <div
                    className="day__image-container"
                    style={{ backgroundImage: `url(${this.props.image ? this.props.image.media[0].thumbnailSrc : ''})` }}>
                    {this.props.events.map((event, index) => {
                        let classNames = ['day__event', `day__event--${event.colorId}`];

                        if (event.startDate === this.props.date) {
                            classNames.push('day__event--start');
                        }
                        if (event.endDate === this.props.date) {
                            classNames.push('day__event--end');
                        }

                        const nextDate = new Date(event.startDate);
                        nextDate.setDate(nextDate.getDate() + 1);
                        const nextDateString = getDateStringFromDate(nextDate);
                        const showEventLabel = this.props.date !== event.startDate
                                            && this.props.date !== event.endDate
                                            && (this.props.dayIndex % 7 === 0
                                            || this.props.date === nextDateString
                                            || this.props.displayNumber === 1);

                        return (
                                <div key={index} className={classNames.join(' ')}>
                                    {showEventLabel &&
                                        <div className="day__event-label">{event.summary}</div>
                                    }
                                </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default CalendarDay;
