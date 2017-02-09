import React from 'react';
import Quill from 'quill';
import { getEvents } from '../js/eventService.js';
import { postText } from '../js/textService.js';

class Admin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            events: [],
            selectedType: null
        }
    }
    componentDidMount() {
        const quill = new Quill('#editor', {
            theme: 'snow'
        });
        const events = getEvents().then((events) => {
            this.setState({ events, quill });
        });
    }
    handleInputChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    onSaveText() {
        const type = this.state.selectedType;
        const date = type === 'date' ? this.state.selectedDate : null;
        const event = type === 'event' ? this.state.selectedEvent : null;
        const html = this.state.quill.root.innerHTML;
        postText({ type, date, event, html }).then((response) => {
            console.log('text saved');
            console.log(response);
        });
    }
    render () {
        return (
            <div className="admin__page">
                <h1>Hi AuA! Writing something?</h1>
                <div className="admin__radio">
                    <label>
                        <input
                            name="selectedType"
                            type="radio"
                            value="event"
                            checked={this.state.selectedType === 'event'}
                            onChange={this.handleInputChange.bind(this)}
                        />
                        <span>Event</span>
                    </label>
                    <label>
                        <input
                            name="selectedType"
                            type="radio"
                            value="date"
                            checked={this.state.selectedType === 'date'}
                            onChange={this.handleInputChange.bind(this)}
                        />
                        <span>Date</span>
                    </label>
                </div>
                {this.state.selectedType === 'event' &&
                    <select
                        name="selectedEvent"
                        className="admin__selector"
                        onChange={this.handleInputChange.bind(this)}
                    >
                        <option value={null}></option>
                        {this.state.events.map((event, index) => {
                            return (<option value={event.eventId} key={index}>{event.summary}</option>);
                        })}
                    </select>
                }
                {this.state.selectedType === 'date' &&
                    <input
                        name="selectedDate"
                        className="admin__selector"
                        type="date"
                        onChange={this.handleInputChange.bind(this)}
                    />
                }
                <div className="admin__editor">
                    <div id="editor"></div>
                </div>
                <button className="button" onClick={() => this.onSaveText()}>Save</button>
            </div>
        );
    }
}

export default Admin;
