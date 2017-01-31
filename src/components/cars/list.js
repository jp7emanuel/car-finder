import React, { Component } from 'react';
import { Link } from 'react-router';
import InfiniteScroll from 'react-infinite-scroller';
import _ from 'lodash';

class List extends Component {
  state = { carsList: [], hasMore: true };

  componentWillMount() {
    this.setState({ carsList: this.sliceCars() });
  }

  onDelete(id) {
    event.preventDefault();
    this.props.onDelete(id);
  }

  sliceCars(start = 0, end = 10) {
    return _.slice(this.props.cars, start, end);
  }

  handleLoadMore() {
    let startValue = this.state.carsList.length + 10;
    this.setState({ carsList: this.state.carsList.concat(this.sliceCars(this.state.carsList.length, startValue)) });

    if (this.state.carsList.length === this.props.cars.length) {
      this.setState({ hasMore: false });
    }
  }

  render() {
    let carsRender = null;
    if (this.state.carsList) {
      carsRender = this.state.carsList.map((car) => {
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
    }

    return (
      <InfiniteScroll
        pageStart={10}
        loadMore={this.handleLoadMore.bind(this)}
        hasMore={this.state.hasMore}
        loader={<div className="loader">Loading ...</div>}
        initialLoad={false}
      >
        <div className='ui divided items'>
          {carsRender}
        </div>
      </InfiniteScroll>
    );
  }
}

export default List;
