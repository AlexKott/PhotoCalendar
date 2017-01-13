import React from 'react';
import CalendarDay from './CalendarDay.jsx';
import { getCurrentMonth, getDaysArray } from '../js/dateHelper.js';

class Calendar extends React.Component {
    constructor(props) {
      super(props);

      const currentMonth = getCurrentMonth();

      const daysArray = getDaysArray();

      // create fill days
      const numberOfFillDays = currentMonth.firstWeekday === 0 ? 6 : currentMonth.firstWeekday - 1;
      const fillElementsStart = [];
      for (let i = 0; i < numberOfFillDays; i++) {
        fillElementsStart.push(<div className="monthGrid__element" key={i}></div>);
      }

      const fillElementsEnd = [];
      let totalDays = numberOfFillDays + currentMonth.numberOfDays;
      while (totalDays % 7 !== 0) {
        fillElementsEnd.push(<div className="monthGrid__element" key={totalDays}></div>);
        totalDays++;
      }

      this.state = {
        currentMonth,
        daysArray,
        fillElementsStart,
        fillElementsEnd,
        selectedDay: '01-13-2017'
      }
    }
    onSelectDay(selectedDay) {
      this.setState({ selectedDay });
    }
    render() {
        return (
          <div>
            <h1 className="calendar__title">{this.state.currentMonth.name}</h1>
            <div className="monthGrid">
              {this.state.fillElementsStart}
              {this.state.daysArray.map((day) => (
                <CalendarDay
                  key={day.date}
                  date={day.date}
                  displayNumber={day.displayNumber}
                  onSelectDay={() => this.onSelectDay(day.date)}
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
