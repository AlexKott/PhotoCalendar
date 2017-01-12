import React from 'react';
import MonthDay from './MonthDay.jsx';

class Month extends React.Component {
  componentWillMount() {
    const days = [];
    for  (let i = 0; i < this.props.numberOfDays; i++) {
      days.push(<MonthDay key={i + 1} date={i + 1} />);
    }
    this.setState({ days });
  }
  render() {
    return (
      <div>
      {this.state.days}
      </div>
    );
  }
}

export default Month;
