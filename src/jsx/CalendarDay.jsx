import React from 'react';

class CalendarDay extends React.Component {
    render() {
        return (
            <div
                className={this.props.isSelected ? 'calendar__day calendar__day--selected' : 'calendar__day'}
                onClick={() => this.props.onSelectDay(this.props.date)}
            >{this.props.displayNumber}</div>
        );
    }
}

export default CalendarDay;
