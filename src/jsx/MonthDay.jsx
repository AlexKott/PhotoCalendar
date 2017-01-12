import React from 'react';

class MonthDay extends React.Component {
  render() {
    return (
      <div className="month__day">{this.props.date}</div>
    );
  }
}

export default MonthDay;
