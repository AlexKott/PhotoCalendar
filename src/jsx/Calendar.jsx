import React from 'react';
import Month from './Month.jsx';

class Calendar extends React.Component {
    render() {
        return (
            <Month numberOfDays={30} />
        );
    }
}

export default Calendar;
