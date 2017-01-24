import React, { Component } from 'react';

export default class Index extends Component {
  render() {
    return (
      <div>
        <div className='container'>
          {this.props.children}
        </div>
      </div>
    );
  }
}
