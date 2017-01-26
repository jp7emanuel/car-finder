import React, { Component } from 'react';

class List extends Component {
  render() {
    const carsRender = this.props.cars.map((car) => {
      return (
        <div className='item' key={car._id}>
          <div className='middle aligned content'>
            <div className='header'>{car.name}</div>
            <div className='description'>
              <p># { car._maker[0].name }</p>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className='ui items'>
        {carsRender}
      </div>
    );
  }
}

export default List;
