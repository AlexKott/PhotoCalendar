import React from 'react';
import { Link } from 'redux-little-router';

export default function CalendarWeek({ week, thumbnails }) {
    return (
        <div className="c-week__days">
            {week.map((day, index) => {
                if (day.date) {
                    return (
                        <div className="c-week__day" key={index}>
                            {thumbnails[day.date] &&
                                <Link
                                    className="c-week__day-thumbnail"
                                    style={{ backgroundImage: `url(${thumbnails[day.date][0].thumbnailSrc})`}}
                                    href={`/day/${day.date}`}
                                ></Link>
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
