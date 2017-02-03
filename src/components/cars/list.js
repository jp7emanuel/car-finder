import React, { Component } from 'react';
import { Link } from 'react-router';
import InfiniteScroll from 'react-infinite-scroller';
import _ from 'lodash';

class List extends Component {
  state = { carsList: [], hasMore: true };

  componentWillMount() {
    this.setState({ carsList: this.sliceCars() });
  }

  componentWillUpdate(nextProps, nextState) {
    if (_.isEqual(nextProps.cars, nextState.carsList) && nextState.hasMore !== false) {
      this.setState({ hasMore: false });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(this.props.cars, prevProps.cars)) {
      _.assign(this.props.cars, {});

      this.setState({ carsList: this.sliceCars() });
      this.checkHasMore();
    }
  }

  handleLoadMore() {
    let startValue = this.state.carsList.length + 10;
    this.setState({ carsList: this.state.carsList.concat(this.sliceCars(this.state.carsList.length, startValue)) });

    this.checkHasMore(this.state.carsList);
  }

  checkHasMore(lista) {
    this.setState({ hasMore: !_.isEqual(lista, this.props.cars) });
  }

  sliceCars(start = 0, end = 10) {
    return _.slice(this.props.cars, start, end);
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
              <div className='meta'>{car.maker.name}</div>
              <div className='description'>{car.details.substr(0, 300)}...</div>
              <div className='extra'>
                <p className='price'>R$ {car.price || 'A definir'}</p>
                <div className='ui right floated'>
                  <Link to={`/cars/show/${car._id}`}  className='ui primary basic button'>Details</Link>
                </div>
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
        <div className='ui items items-list'>
          {carsRender}
        </div>
      </InfiniteScroll>
    );
  }
}

export default List;
