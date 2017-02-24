import React from 'react';

class CalendarWeek extends React.Component {
    constructor(props) {
        super(props);
        this.state = { events: [] }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ events: reduceEvents(this.props.week) });
    }
    render() {
        const {
            week,
            selectedDay,
            dailyThumbnails,
            onSelectElement
        } = this.props;
        return (
            <section className="c-week">
                <div className="c-week__days">
                    {week.map((day, index) => {
                        if (day.date) {
                            return (
                                <div
                                    className={selectedDay === day.date ? 'c-week__day c-week__day--selected' : 'c-week__day'}
                                    onClick={() => onSelectElement({ date: day.date, isDate: true })}
                                    key={index}
                                >
                                {dailyThumbnails[day.date] &&
                                    <div
                                        className="c-week__day-thumbnail"
                                        style={{ backgroundImage: `url(${dailyThumbnails[day.date].media[0].thumbnailSrc})`}}
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
                <div className="c-week__events">
                    {this.state.events.map((event, index) => {
                        if (event.isEvent) {
                            return (
                                <div
                                    className={`c-week__event c-week__event--${event.colorId}`}
                                    style={{ flexBasis: `${100/7*event.size}%`}}
                                    onClick={() => onSelectElement(event)}
                                    key={index}
                                >{event.summary}</div>
                            );
                        } else {
                            return (<div className="c-week__event c-week__event--pseudo" style={{ flexBasis: `${100/7*event.size}%`}} key={index}></div>);
                        }
                    })}
                </div>
            </section>
        );
    }
}

function reduceEvents(week) {
    const weekLength = week.length;
    const elements = [];
    let current;

    for (let i = 0; i < weekLength; i++) {
        if (!week[i].events || week[i].events.length === 0) {
            if (!current) { // first day of the week
                current = { isEvent: false, size: 1 }
            } else if (!current.isEvent) {
                current.size++;
            } else if (current.isEvent) {
                elements.push(current);
                current = { isEvent: false, size: 1 };
            }
        } else if (week[i].events.length === 1) {
            const event = week[i].events[0];
            if (current && current.isEvent && current.summary === event.summary) {
                current.size++;
            } else {
                if (current) {
                    elements.push(current);
                }
                current = Object.assign({}, event, { isEvent: true, size: 1 });
            }
        } else if (week[i].events.length === 2) {
            const startEvent = week[i].events[0].isStart ? week[i].events[0] : week[i].events[1];
            const endEvent = week[i].events[0].isEnd ? week[i].events[0] : week[i].events[1];
            if (!current) {
                current = Object.assign({}, endEvent, { isEvent: true, size: 0 });
            }
            current.size += 0.5;
            elements.push(current);
            current = Object.assign({}, startEvent, { isEvent: true, size: 0.5 });
        }
    }
    elements.push(current);
    return elements;
}

export default CalendarWeek;
