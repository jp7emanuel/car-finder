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

  handleOnDelete(id) {
    event.preventDefault();
    this.props.onDelete(id);
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
              <img src='http://dlu2usud3h120.cloudfront.net/imagens/modules/localidade/cidades/carro-localidade-personalizada.png' role='presentation' />
            </div>
            <div className='content'>
              <div className='header'>{car.name}</div>
              <div className='meta'>{ car.maker.name }</div>

              <div className='extra'>
                <Link to={`/cars/edit/${car._id}`} className='ui primary basic button'>Edit</Link>
                <a href="#" className='ui negative basic button' onClick={this.handleOnDelete.bind(this, car._id)}>
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
