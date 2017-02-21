import React from 'react';
import Newsletter from './Newsletter.jsx';
import Calendar from './Calendar.jsx';
import DetailView from './DetailView.jsx';
import { getDateString } from '../js/dateHelper.js';

class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedElement: null
        }
    }
    selectElement(selectedElement) {
        this.setState({ selectedElement });
    }

    render() {
        return(
            <div>
                <Newsletter />
                <Calendar selectElement={this.selectElement.bind(this)} />
                <DetailView selectedElement={this.state.selectedElement} />
            </div>
        );
    }
}

export default Blog;
