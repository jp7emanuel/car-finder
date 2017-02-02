import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Router from 'react-router/BrowserRouter';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk';
import promise from 'redux-promise';
import App from './components/app';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk, promise));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
