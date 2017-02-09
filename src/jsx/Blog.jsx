import React from 'react';
import Calendar from './Calendar.jsx';
import DetailView from './DetailView.jsx';
import { getDateString } from '../js/dateHelper.js';

class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: null,
            selectedEvent: null
        }
    }
    updateDate(selectedDate) {
        this.setState({ selectedDate, selectedEvent: null });
    }
    updateEvent(selectedEvent) {
        this.setState({ selectedEvent, selectedDate: null });
    }

    render() {
        return(
            <div>
                <Calendar updateDate={this.updateDate.bind(this)} updateEvent={this.updateEvent.bind(this)}/>
                <DetailView selectedDate={this.state.selectedDate} selectedEvent={this.state.selectedEvent}/>
            </div>
        );
    }
}

export default Blog;
