import React from 'react';
import Match from 'react-router/Match';
import Miss from 'react-router/Miss';

import CarsIndex from './components/cars';
import CarsNew from './components/cars/new';
import CarsShow from './components/cars/show';
import CarsEdit from './components/cars/edit';

import MakersIndex from './components/makers';
import MakersNew from './components/makers/new';
import MakersEdit from './components/makers/edit';

const NoMatch = ({ location }) => (
  <div className='ui container'>
    <div className='ui huge message'>
      <p className='ui center aligned header'>Sorry, Page not found.</p>
    </div>
  </div>
);

const Routes = () => (
  <div>
    <Match exactly pattern='/' component={CarsIndex} />
    <Match pattern='/cars/new' component={CarsNew} />
    <Match pattern='/cars/show/:id' component={CarsShow} />
    <Match pattern='/cars/edit/:id' component={CarsEdit} />

    <Match exactly pattern='/' pattern='/makers' component={MakersIndex} />
    <Match pattern='/makers/new' component={MakersNew} />
    <Match pattern='/makers/edit/:id' component={MakersEdit} />

    <Miss component={NoMatch} />
  </div>
);

export default Routes;
