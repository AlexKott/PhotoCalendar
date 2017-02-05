import React from 'react';
import CalendarWeek from './CalendarWeek.jsx';
import { selectMonth, getDateString, getWeeks, buildEventWeeks } from '../js/dateHelper.js';
import { getPhotos } from '../js/photoService.js';
import { getEvents } from '../js/eventService.js';

class Calendar extends React.Component {
    constructor(props) {
        super(props);

        const selectedMonth = selectMonth();
        const selectedDay = getDateString();
        const weeks = getWeeks(selectedMonth);

        this.state = {
            selectedMonth,
            weeks,
            selectedDay,
            dailyThumbnails: {}
        }
    }
    componentDidMount() {
        this.props.updateDate(this.state.selectedDay);

        const weeks = this.state.weeks;

        getPhotos({ month: this.state.selectedMonth.requestString }).then((photos) => {
            this.setState({ dailyThumbnails: photos });
        });
        getEvents({ month: this.state.selectedMonth.requestString }).then((events) => {
            this.setState({ weeks: buildEventWeeks(weeks, events) });
        });
    }
    onSelectDay(selectedDay) {
        this.setState({ selectedDay });
        this.props.updateDate(selectedDay);
    }
    onChangeMonth(direction) {
        const selectedMonth = selectMonth((this.state.selectedMonth.month + direction), this.state.selectedMonth.year);
        const weeks = getWeeks(selectedMonth);
        this.setState({ weeks });

        getPhotos({ month: selectedMonth.requestString }).then((photos) => {
            this.setState({ dailyThumbnails: photos });
        });
        getEvents({ month: selectedMonth.requestString }).then((events) => {
            this.setState({ weeks: buildEventWeeks(weeks, events) });
        });

        this.setState({ selectedMonth });
    }
    render() {
        return (
            <div>
                <div className="calendar__header">
                    <button className="button" onClick={() => this.onChangeMonth(-1)}>Previous</button>
                    <h1 className="calendar__title">{this.state.selectedMonth.displayName}</h1>
                    <button className="button" onClick={() => this.onChangeMonth(1)}>Next</button>
                </div>
                <div className="calendar">
                    {this.state.weeks.map((days, index) => (
                        <CalendarWeek
                            days={days}
                            key={index}
                            images={this.state.dailyThumbnails}
                            onSelectDay={this.onSelectDay.bind(this)}
                            selectedDay={this.state.selectedDay}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default Calendar;
