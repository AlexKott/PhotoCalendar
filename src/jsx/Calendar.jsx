import React from 'react';
import CalendarWeek from './CalendarWeek.jsx';
import { selectMonth, getDateString, getWeeks, buildEventWeeks } from '../js/dateHelper.js';
import { getPhotosByDate } from '../js/photoService.js';
import { getEventsByMonth } from '../js/eventService.js';

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
        this.props.selectElement({ date: this.state.selectedDay, isDate: true });

        const month = this.state.selectedMonth;
        const weeks = this.state.weeks;

        getPhotosByDate(month.requestString).then((photos) => {
            this.setState({ dailyThumbnails: photos });
        });
        getEventsByMonth(month.requestString).then((events) => {
            this.setState({ weeks: buildEventWeeks(weeks, events) });
        });
    }
    onSelectElement(selectedElement) {
        this.props.selectElement(selectedElement);
        if (selectedElement.isDate) {
            this.setState({ selectedDay: selectedElement.date });
        } else if (selectedElement.isEvent) {
            this.setState({ selectedDay: null });
        }
    }
    onChangeMonth(direction) {
        const selectedMonth = selectMonth((this.state.selectedMonth.month + direction), this.state.selectedMonth.year);
        const weeks = getWeeks(selectedMonth);
        this.setState({ weeks });

        getPhotosByDate(selectedMonth.requestString).then((photos) => {
            this.setState({ dailyThumbnails: photos });
        });
        getEventsByMonth(selectedMonth.requestString).then((events) => {
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
                    {this.state.weeks.map((week, index) => (
                        <CalendarWeek
                            week={week}
                            key={index}
                            dailyThumbnails={this.state.dailyThumbnails}
                            onSelectElement={this.onSelectElement.bind(this)}
                            selectedDay={this.state.selectedDay}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default Calendar;
