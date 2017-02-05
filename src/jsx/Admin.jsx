import React from 'react';
import { getEvents } from '../js/eventService.js';

class Admin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            events: [],
            selectedType: null
        }
    }
    componentDidMount() {
        const events = getEvents().then((events) => {
            this.setState({ events });
        });
    }
    onChangeType(e) {
        this.setState({ selectedType: e.target.value });
    }
    render () {
        return (
            <div>
                <div>Hi AuA!</div>
                <label>
                    <input
                        type="radio"
                        value="event"
                        checked={this.state.selectedType === 'event'}
                        onChange={this.onChangeType.bind(this)}
                    />
                    <span>Event</span>
                </label>
                <label>
                    <input
                        type="radio"
                        value="date"
                        checked={this.state.selectedType === 'date'}
                        onChange={this.onChangeType.bind(this)}
                    />
                    <span>Date</span>
                </label>
                {this.state.selectedType === 'event' &&
                    <select>
                        {this.state.events.map((event, index) => {
                            return (<option key={index}>{event.summary}</option>);
                        })}
                    </select>
                }
                {this.state.selectedType === 'date' && <input type="date"></input>}
                <textarea></textarea>
                <button className="button">Save</button>
            </div>
        );
    }
}

export default Admin;
