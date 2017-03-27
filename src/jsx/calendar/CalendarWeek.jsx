import React from 'react';
import { Link } from 'redux-little-router';

export default function CalendarWeek({ week, thumbnails }) {
    return (
        <div className="week__days">
            {week.map((day, index) => {
                const classNames = `week__day ${day.date ? '' : 'week__day--pseudo'} ${thumbnails[day.date] ? 'week__day--hasContent' : ''}`;
                return (
                    <div className={classNames} key={index}>
                        {thumbnails[day.date] &&
                            <Link
                                className="week__day-thumbnail"
                                style={{ backgroundImage: `url(${thumbnails[day.date][0].thumbnailSrc})`}}
                                href={`/day/${day.date}`}
                            ></Link>
                        }
                        <span className="week__day-number">{day.displayNumber}</span>
                    </div>
                );
            })}
        </div>
    );
}
