import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router'
import reducers from './reducers';
import routes from './routes';
import ReduxThunk from 'redux-thunk';
import promise from 'redux-promise';

const store = createStore(reducers, {}, applyMiddleware(promise, ReduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
