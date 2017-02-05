import React from 'react';
import { render } from 'react-dom';
import Blog from './Blog.jsx';
import Admin from './Admin.jsx';

class App extends React.Component {
    render() {
        const path = window.location.pathname;
        if (path === '/admin') {
            return (
                <Admin />
            );
        } else {
            return (
                <Blog />
            );
        }
    }
}

render(<App />, document.querySelector('#app'));
