import React from 'react';

export default function CalendarWeek({ week, thumbnails, onSelectDay }) {
    return (
        <div className="week__days">
            {week.map((day, index) => {
                if (day.date) {
                    return (
                        <div className="week__day" key={index}>
                            {thumbnails[day.date] &&
                                <div
                                    className="week__day-thumbnail"
                                    style={{ backgroundImage: `url(${thumbnails[day.date][0].thumbnailSrc})`}}
                                    onClick={() => onSelectDay(day.date)}
                                />
                            }
                            <span className="week__day-number">{day.displayNumber}</span>
                        </div>
                    );
                } else {
                    return (<div className="week__day week__day--pseudo" key={index}></div>);
                }
            })}
        </div>
    );
}
