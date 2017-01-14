import React from 'react';
import Calendar from './Calendar.jsx';
import DetailView from './DetailView.jsx';
import { getDateString } from '../js/dateHelper.js';

class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectedDate: null }
    }
    updateDate(selectedDate) {
        this.setState({ selectedDate });
    }

    render() {
        return(
            <div>
                <Calendar updateDate={this.updateDate.bind(this)}/>
                <DetailView selectedDate={this.state.selectedDate}/>
            </div>
        );
    }
}

export default Blog;
