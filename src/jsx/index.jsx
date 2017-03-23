import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from './reducers.js';
import AppContainer from './app/AppContainer.jsx';

const store = createStore(combineReducers(reducers), applyMiddleware(thunk));

render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.querySelector('#app')
);
