import React from 'react';

export default function CalendarWeek({ week, thumbnails, onSelectDay }) {
    return (
        <div className="c-week__days">
            {week.map((day, index) => {
                if (day.date) {
                    return (
                        <div className="c-week__day" key={index}>
                            {thumbnails[day.date] &&
                                <div
                                    className="c-week__day-thumbnail"
                                    style={{ backgroundImage: `url(${thumbnails[day.date][0].thumbnailSrc})`}}
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
