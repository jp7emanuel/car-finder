import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import CarsIndex from './components/cars';
import CarsNew from './components/cars/new';
import CarsEdit from './components/cars/edit';

import MakersIndex from './components/makers';
import MakersNew from './components/makers/new';
import MakersEdit from './components/makers/edit';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={CarsIndex} />
    <Route path='cars/new' component={CarsNew} />
    <Route path='cars/edit/:id' component={CarsEdit} />

    <Route path='makers' component={MakersIndex} />
    <Route path='makers/new' component={MakersNew} />
    <Route path='makers/edit/:id' component={MakersEdit} />
  </Route>
);
