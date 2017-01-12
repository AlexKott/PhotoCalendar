import React from 'react';
import Month from './Month.jsx';
import { getCurrentMonth } from '../js/dateHelper.js';

class Calendar extends React.Component {
    componentWillMount() {
      this.setState({ currentMonth: getCurrentMonth() })
    }
    render() {
        return (
          <div>
            {this.state.currentMonth.name}
            <Month numberOfDays={this.state.currentMonth.days} />
          </div>
        );
    }
}

export default Calendar;
