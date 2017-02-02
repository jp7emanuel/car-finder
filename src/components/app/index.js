import React, { Component } from 'react';
import Header from '../common/header';
import Routes from '../../routes';

class Index extends Component {
  render() {
    return (
      <div className='initial-class'>
        <Header />
        <Routes />
      </div>
    );
  }
}

export default Index;
