import React from 'react';

class EventBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { events: null }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ events: nextProps.events });
    }
    render() {
        const {
            onselectContent,
            focussedEvent,
            onFocusEvent,
            onBlurEvent
        } = this.props;
        return(
            <div className="c-week__events">
                {this.state.events && this.state.events.map((event, index) => {
                    if (event.isEvent) {
                        const classNames = `c-week__event c-week__event--${event.colorId} ${focussedEvent === event.eventId ? 'c-week__event--focussed' : ''}`;
                        return (
                            <div
                                className={classNames}
                                style={{ flexBasis: `${100/7*event.size}%`}}
                                onClick={() => onselectContent(event)}
                                onMouseEnter={() => onFocusEvent(event)}
                                onMouseLeave={() => onBlurEvent()}
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
}

export default EventBar;
