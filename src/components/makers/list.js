import React, { Component } from 'react';
import { Link } from 'react-router';

class List extends Component {
  onDelete(id) {
    this.props.onDelete(id);
  }

  render() {
    const makersRender = this.props.makers.map((maker) => {
      return (
        <tr key={maker._id}>
          <td>{maker.name}</td>
          <td>
            <Link to={`/makers/edit/${maker._id}`} className='ui primary basic button'>Edit</Link>
            <a href="#" className='ui negative basic button' onClick={this.onDelete.bind(this, maker._id)}>
              Delete
            </a>
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
