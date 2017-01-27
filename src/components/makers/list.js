import React, { Component } from 'react';
import { Link } from 'react-router';

class List extends Component {
  render() {
    const makersRender = this.props.makers.map((maker) => {
      return (
        <tr key={maker._id}>
          <td>{maker.name}</td>
          <td>
            oi
          </td>
        </tr>
      );
    });

    return (
      <table className='ui single line table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {makersRender}
        </tbody>
      </table>
    );
  }
}

export default List;
