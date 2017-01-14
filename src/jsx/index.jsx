import React from 'react';
import { render } from 'react-dom';
import Blog from './Blog.jsx';

class App extends React.Component {
    render() {
        return (
            <Blog />
        );
    }
}

render(<App />, document.querySelector('#app'));
