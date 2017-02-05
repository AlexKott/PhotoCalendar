import React from 'react';

class CalendarWeek extends React.Component {
    constructor(props) {
        super(props);
        this.state = { events: [] }
    }
    componentWillReceiveProps() {
        this.setState({ events: reduceEvents(this.props.days) });
    }
    render() {
        return (
            <section className="c-week">
                <div className="c-week__days">
                    {this.props.days.map((day, index) => {
                        if (!day.date) {
                            return (<div className="c-week__day c-week__day--pseudo"></div>);
                        } else {
                            return (
                                <div
                                    className="c-week__day"
                                    style={{ backgroundImage: `url(${this.props.images[day.date] ? this.props.images[day.date].media[0].thumbnailSrc : ''})` }}
                                >{day.displayNumber}</div>
                            );
                        }
                    })}
                </div>
                <div className="c-week__events">
                    {this.state.events.map((event, index) => {
                        if (event.isEvent) {
                            return (
                                <div
                                    className={`c-week__event c-week__event--${event.colorId}`}
                                    style={{ flexBasis: `${100/7*event.size}%`}}
                                >{event.summary}</div>
                            );
                        } else {
                            return <div className="c-week__event c-week__event--pseudo" style={{ flexBasis: `${100/7*event.size}%`}}></div>;
                        }
                    })}
                </div>
            </section>
        );
    }
}

function reduceEvents(days) {
    const daysLength = days.length;
    const elements = [];
    let current;

    for (let i = 0; i < daysLength; i++) {
        if (!days[i].events || days[i].events.length === 0) {
            if (!current) { // first day of the week
                current = { isEvent: false, size: 1 }
            } else if (!current.isEvent) {
                current.size++;
            } else if (current.isEvent) {
                elements.push(current);
                current = { isEvent: false, size: 1 };
            }
        } else if (days[i].events.length === 1) {
            const event = days[i].events[0];
            if (current && current.isEvent && current.summary === event.summary) {
                current.size++;
            } else {
                if (current) {
                    elements.push(current);
                }
                current = { isEvent: true, colorId: event.colorId, summary: event.summary, size: 1 };
            }
        } else if (days[i].events.length === 2) {
            const startEvent = days[i].events[0].isStart ? days[i].events[0] : days[i].events[1];
            const endEvent = days[i].events[0].isEnd ? days[i].events[0] : days[i].events[1];
            if (!current) {
                current = { isEvent: true, colorId: endEvent.colorId, summary: endEvent.summary, size: 0 };
            }
            current.size += 0.5;
            elements.push(current);
            current = { isEvent: true, colorId: startEvent.colorId, summary: startEvent.summary, size: 0.5 };
        }
    }
    elements.push(current);
    return elements;
}

export default CalendarWeek;
