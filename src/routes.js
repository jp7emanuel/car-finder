import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import CarsIndex from './components/Cars';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={CarsIndex} />
  </Route>
);
