import React from 'react';

export default function CalendarWeek({ week, thumbnails, onSelectDay }) {
    return (
        <div className="week__days">
            {week.map((day, index) => {
                const classNames = `week__day ${day.date ? '' : 'week__day--pseudo'} ${thumbnails[day.date] ? 'week__day--hasContent' : ''}`;
                return (
                    <div className={classNames}>
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
            })}
        </div>
    );
}
