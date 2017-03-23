import React from 'react';

export default function EventBar({
    events,
    focussedEvent,
    onFocusEvent,
    onSelectEvent }) {
    return(
        <div className="c-week__events">
            {events && events.map((event, index) => {
                if (event.isEvent) {
                    const classNames = `c-week__event c-week__event--${event.colorId} ${focussedEvent === event.eventId ? 'c-week__event--focussed' : ''}`;
                    return (
                        <div
                            className={classNames}
                            style={{ flexBasis: `${100/7*event.size}%`}}
                            onClick={() => onSelectEvent(event)}
                            onMouseEnter={() => onFocusEvent(event.eventId)}
                            onMouseLeave={() => onFocusEvent('')}
                            key={index}
                        >{event.summary}</div>
                    );
                } else {
                    return (<div className="c-week__event c-week__event--pseudo" style={{ flexBasis: `${100/7*event.size}%`}} key={index}></div>);
                }
            })}
        </div>
    );
}
