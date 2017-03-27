import React from 'react';
import { Link } from 'redux-little-router';

export default function EventBar({
    events,
    focussedEvent,
    onFocusEvent }) {
    return(
        <div className="c-week__events">
            {events && events.map((event, index) => {
                if (event.isEvent) {
                    const classNames = `c-week__event c-week__event--${event.colorId} ${focussedEvent === event.eventId ? 'c-week__event--focussed' : ''}`;
                    return (
                        <Link
                            className={classNames}
                            style={{ flexBasis: `${100/7*event.size}%`}}
                            href={`/event/${event.eventId}?summary=${event.summary}&startDate=${event.startDate}&endDate=${event.endDate}`}
                            onMouseEnter={() => onFocusEvent(event.eventId)}
                            onMouseLeave={() => onFocusEvent('')}
                            key={index}
                        >{event.summary}</Link>
                    );
                } else {
                    return (<div className="c-week__event c-week__event--pseudo" style={{ flexBasis: `${100/7*event.size}%`}} key={index}></div>);
                }
            })}
        </div>
    );
}
