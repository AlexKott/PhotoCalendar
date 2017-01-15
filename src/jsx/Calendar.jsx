import React from 'react';
import CalendarDay from './CalendarDay.jsx';
import { selectMonth, getDaysArray, getDateString } from '../js/dateHelper.js';
import { getPhotos } from '../js/photoService.js';

class Calendar extends React.Component {
    constructor(props) {
        super(props);

        const selectedMonth = selectMonth();
        const daysArray = getDaysArray();
        const selectedDay = getDateString();
        const fillElementsStart = this.calculateOffsetStart(selectedMonth);
        const fillElementsEnd = this.calculateOffsetEnd(selectedMonth);

        this.state = {
            selectedMonth,
            daysArray,
            fillElementsStart,
            fillElementsEnd,
            selectedDay,
            dailyThumbnails: {}
        }
    }
    componentWillMount() {

    }
    componentDidMount() {
        this.props.updateDate(this.state.selectedDay);
        getPhotos({ month: this.state.selectedMonth.requestString }, 's200').then((photos) => {
            this.setState({ dailyThumbnails: photos });
        });
    }
    calculateOffsetStart(month) {
        const numberOfFillDays = month.firstWeekday === 0 ? 6 : month.firstWeekday - 1;
        const fillElementsStart = [];
        for (let i = 0; i < numberOfFillDays; i++) {
            fillElementsStart.push(<div className="monthGrid__element" key={i}></div>);
        }
        return fillElementsStart;
    }
    calculateOffsetEnd(month) {
        const numberOfFillDays = month.firstWeekday === 0 ? 6 : month.firstWeekday - 1;
        const fillElementsEnd = [];
        let totalDays = numberOfFillDays + month.numberOfDays;
        while (totalDays % 7 !== 0) {
            fillElementsEnd.push(<div className="monthGrid__element" key={totalDays}></div>);
            totalDays++;
        }
        return fillElementsEnd;
    }
    onSelectDay(selectedDay) {
        this.setState({ selectedDay });
        this.props.updateDate(selectedDay);
    }
    onChangeMonth(direction) {
        const selectedMonth = selectMonth((this.state.selectedMonth.month + direction), this.state.selectedMonth.year);
        const daysArray = getDaysArray(selectedMonth.month, selectedMonth.year);
        const fillElementsStart = this.calculateOffsetStart(selectedMonth);
        const fillElementsEnd = this.calculateOffsetEnd(selectedMonth);
        getPhotos({ month: selectedMonth.requestString }, 's150').then((photos) => {
            this.setState({ dailyThumbnails: photos });
        });

        this.setState({ selectedMonth, daysArray, fillElementsStart, fillElementsEnd });
    }
    render() {
        return (
            <div>
                <div className="calendar__header">
                    <button className="button" onClick={() => this.onChangeMonth(-1)}>Previous</button>
                    <h1 className="calendar__title">{this.state.selectedMonth.displayName}</h1>
                    <button className="button" onClick={() => this.onChangeMonth(1)}>Next</button>
                </div>
                <div className="monthGrid">
                    {this.state.fillElementsStart}
                    {this.state.daysArray.map((day) => (
                        <CalendarDay
                            key={day.date}
                            date={day.date}
                            displayNumber={day.displayNumber}
                            image={this.state.dailyThumbnails[day.date]}
                            onSelectDay={this.onSelectDay.bind(this)}
                            isSelected={day.date === this.state.selectedDay}
                        />
                    ))}
                    {this.state.fillElementsEnd}
                </div>
            </div>
        );
    }
}

export default Calendar;
