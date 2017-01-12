import React from 'react';
import MonthDay from './MonthDay.jsx';
import { weekdays } from '../js/dateConstants.js';

class Month extends React.Component {
  componentWillMount() {
    // setup MonthDays according to number of days
    const days = [];
    for  (let i = 0; i < this.props.numberOfDays; i++) {
      days.push(<MonthDay key={i + 1} date={i + 1} />);
    }

    // starting the week on Monday
    const shiftedWeekdays = weekdays.slice();
    shiftedWeekdays.push(shiftedWeekdays.shift());

    // create fill days
    const numberOfFillDays = this.props.firstWeekday === 0 ? 6 : this.props.firstWeekday - 1;
    const fillElementsStart = [];
    for (let i = 0; i < numberOfFillDays; i++) {
      fillElementsStart.push(<div className="monthGrid__element" key={i}></div>);
    }

    const fillElementsEnd = [];
    let totalDays = numberOfFillDays + this.props.numberOfDays;
    while (totalDays % 7 !== 0) {
      fillElementsEnd.push(<div className="monthGrid__element" key={totalDays}></div>);
      totalDays++;
    }

    // set state
    this.setState({ days, shiftedWeekdays, fillElementsStart, fillElementsEnd });
  }
  render() {
    return (
      <div className="monthGrid">
        {this.state.shiftedWeekdays.map((weekday, i) => {
          return (<div className="month__weekday" key={i}>{weekday}</div>);
        })}
        {this.state.fillElementsStart}
        {this.state.days}
        {this.state.fillElementsEnd}
      </div>
    );
  }
}

export default Month;
