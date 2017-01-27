import React, { Component } from 'react';
import Header from '../common/header';

export default class Index extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className='container'>
          {this.props.children}
        </div>
      </div>
    );
  }
}
