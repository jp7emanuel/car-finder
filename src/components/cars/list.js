import React, { Component } from 'react';
import { Link } from 'react-router';

class List extends Component {
  onDelete(id) {
    event.preventDefault();
    this.props.onDelete(id);
  }

  render() {
    const carsRender = this.props.cars.map((car) => {
      return (
        <tr key={car._id}>
          <td>{car.name}</td>
          <td>{ car.maker.name }</td>
          <td>
            <Link to={`/cars/edit/${car._id}`} className='ui primary basic button'>Edit</Link>
            <a href="#" className='ui negative basic button' onClick={this.onDelete.bind(this, car._id)}>
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
            <th>Mark</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {carsRender}
        </tbody>
      </table>
    );
  }
}

export default List;
