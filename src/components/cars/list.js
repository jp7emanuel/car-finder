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
        <div key={car._id} className='item'>
          <div className='image'>
            <img src={car.photo} role='presentation' />
          </div>
          <div className='content'>
            <div className='header'>{car.name}</div>
            <div className='meta'>{ car.maker.name }</div>

            <div className='extra'>
              <Link to={`/cars/edit/${car._id}`} className='ui primary basic button'>Edit</Link>
              <a href="#" className='ui negative basic button' onClick={this.onDelete.bind(this, car._id)}>
                Delete
              </a>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className='ui divided items'>
        {carsRender}
      </div>
    );
  }
}

export default List;
