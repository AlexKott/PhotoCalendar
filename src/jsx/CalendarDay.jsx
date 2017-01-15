import React from 'react';

class CalendarDay extends React.Component {
    render() {
        return (
            <div
                className={this.props.isSelected ? 'day day--selected' : 'day'}
                onClick={() => this.props.onSelectDay(this.props.date)}
            >
                <span>{this.props.displayNumber}</span>
                <div
                    className="day__image-container"
                    style={{ backgroundImage: `url(${this.props.image ? this.props.image.media[0].src : ''})` }}>
                </div>
            </div>
        );
    }
}

export default CalendarDay;
