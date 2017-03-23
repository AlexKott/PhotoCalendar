import React from 'react';
import Quill from 'quill';
import { getAllEvents } from '../_services/eventService.js';
import { getText, postText, updateText } from '../_services/textService.js';

class Admin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            events: [],
            selectedType: null,
            isLoadingText: false,
            password: ''
        }
    }
    componentDidMount() {
        const quill = new Quill('#editor', {
            theme: 'snow'
        });
        const events = getAllEvents().then((events) => {
            this.setState({ events, quill });
        });
    }
    onSelectType(e) {
        this.setState({ selectedType: e.target.value });
    }
    onSelectId(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
            isLoadingText: true
        });
        getText(value)
            .then(text => {
                if (!text) {
                    this.setState({ isUpdating: false, isLoadingText: false });
                    return;
                }
                this.setState({ isUpdating: true });

                if (this.state.quill.root.innerText.trim()) {
                    if(confirm('Load text from database? (Local changes will be lost!)')) {
                        this.state.quill.root.innerHTML = text.content;
                    }
                }
                else {
                    this.state.quill.root.innerHTML = text.content;
                }
                this.setState({ isLoadingText: false });
            })
            .catch(error => {
                this.setState({ isLoadingText: false });
                console.log(error)
            });
    }
    onEnterPassword(e) {
        this.setState({ password: e.target.value });
    }
    onSaveText() {
        const type = this.state.selectedType;
        const date = type === 'date' ? this.state.selectedDate : null;
        const eventId = type === 'event' ? this.state.selectedEvent : null;
        const password = this.state.password;
        let eventSummary;
        if (type === 'event') {
            eventSummary = this.state.events.find(event => event.eventId === eventId).summary;
        }
        const html = this.state.quill.root.innerHTML;
        if (this.state.isUpdating) {
            updateText({ password, type, date, eventId, html }).then((response) => {
                console.log(response);
            });
        } else {
            postText({ password, type, date, eventId, html, eventSummary }).then((response) => {
                console.log(response);
            });
        }
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
                            onChange={this.onSelectType.bind(this)}
                        />
                        <span>Event</span>
                    </label>
                    <label>
                        <input
                            name="selectedType"
                            type="radio"
                            value="date"
                            checked={this.state.selectedType === 'date'}
                            onChange={this.onSelectType.bind(this)}
                        />
                        <span>Date</span>
                    </label>
                </div>
                {this.state.selectedType === 'event' &&
                    <select
                        name="selectedEvent"
                        className="admin__selector"
                        onChange={this.onSelectId.bind(this)}
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
                        onChange={this.onSelectId.bind(this)}
                    />
                }

                <div className="admin__editor">
                    {this.state.isLoadingText && (<img className="admin__loader" src="assets/images/loader.svg" />)}
                    <div id="editor"></div>
                </div>

                <input type="password" onChange={this.onEnterPassword.bind(this)} />
                <button className="button" onClick={() => this.onSaveText()}>Save</button>
            </div>
        );
    }
}

export default Admin;
