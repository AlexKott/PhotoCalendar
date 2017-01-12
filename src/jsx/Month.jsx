import React from 'react';
import MonthDay from './MonthDay.jsx';
import { weekdays } from '../js/dateConstants.js';

class Month extends React.Component {
  componentWillMount() {
    const days = [];
    for  (let i = 0; i < this.props.numberOfDays; i++) {
      days.push(<MonthDay key={i + 1} date={i + 1} />);
    }
    this.setState({ days });

    const shiftedWeekdays = weekdays.slice();
    shiftedWeekdays.push(shiftedWeekdays.shift());
    this.setState({ shiftedWeekdays });
  }
  render() {
    return (
      <div>
      {this.state.shiftedWeekdays}
      {this.state.days}
      </div>
    );
  }
}

export default Month;
