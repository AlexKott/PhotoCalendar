import React from 'react';
import { render } from 'react-dom';
import Calendar from './Calendar.jsx';
import Gallery from './Gallery.jsx';

class App extends React.Component {
    render() {
        return (
            <div>
                <Calendar />
                <Gallery />
            </div>
        );
    }
}

render(<App />, document.querySelector('#app'));
