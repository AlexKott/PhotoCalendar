import React from 'react';

class CalendarWeek extends React.Component {
    render() {
        return (
            <section className="c-week">
                <div className="c-week__days">
                    {this.props.days.map((day, index) => {
                        if (!day.date) {
                            return (<div className="c-week__day">0</div>);
                        } else {
                            return (<div>{day.displayNumber}</div>);
                        }
                    })}
                </div>
            </section>
        );
    }
}

export default CalendarWeek;
