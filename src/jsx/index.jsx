import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import * as reducers from './reducers.js';
import Blog from './Blog.jsx';


const store = createStore(combineReducers(reducers));

render(
    <Provider store={store}>
        <Blog />
    </Provider>,
    document.querySelector('#app')
);
