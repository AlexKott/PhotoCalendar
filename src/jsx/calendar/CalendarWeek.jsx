import React from 'react';
import { Link } from 'redux-little-router';

import IconText from '../svg/IconText.jsx';

export default function CalendarWeek({ week, thumbnails, texts }) {
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
                        {texts.indexOf(day.date) !== -1 &&
                            <div className="week__day-text"><IconText size="16px" /></div>
                        }
                        <span className="week__day-number">{day.displayNumber}</span>
                    </div>
                );
            })}
        </div>
    );
}
