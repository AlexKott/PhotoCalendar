import React from 'react';
import { render } from 'react-dom';
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { routerForBrowser, RouterProvider } from 'redux-little-router';

import * as reducers from './reducers.js';
import routes from './routes.js';

import App from './app/App.jsx';

const {
  reducer,
  middleware,
  enhancer
} = routerForBrowser({ routes });

const store = createStore(
    combineReducers(Object.assign({}, { router: reducer }, reducers )),
    compose(enhancer, applyMiddleware(middleware), applyMiddleware(thunk))
);

render(
    <Provider store={store}>
        <RouterProvider store={store}>
            <App />
        </RouterProvider>
    </Provider>,
    document.querySelector('#app')
);
