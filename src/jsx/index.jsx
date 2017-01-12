import React from 'react';
import { render } from 'react-dom';
import Calendar from './calendar.jsx';

class App extends React.Component {
    render() {
        return (
            <Calendar />
        );
    }
}

render(<App />, document.querySelector('#app'));
