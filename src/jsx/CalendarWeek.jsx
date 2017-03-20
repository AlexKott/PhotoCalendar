import React from 'react';

class CalendarWeek extends React.Component {
    render() {
        const {
            week,
            dailyThumbnails,
            onSelectDay,
        } = this.props;
        return (
                <div className="c-week__days">
                    {week.map((day, index) => {
                        if (day.date) {
                            return (
                                <div className="c-week__day" key={index}>
                                {dailyThumbnails[day.date] &&
                                    <div
                                        className="c-week__day-thumbnail"
                                        style={{ backgroundImage: `url(${dailyThumbnails[day.date][0].thumbnailSrc})`}}
                                        onClick={() => onSelectDay(day.date)}
                                    />
                                }
                                    <span className="c-week__day-number">{day.displayNumber}</span>
                                </div>
                            );
                        } else {
                            return (<div className="c-week__day c-week__day--pseudo" key={index}></div>);
                        }
                    })}
                </div>
        );
    }
}

export default CalendarWeek;
