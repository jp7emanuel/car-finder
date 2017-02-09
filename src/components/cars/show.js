import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchCar, deleteCar } from '../../actions/index';
import { Link } from 'react-router';
import { Loading } from '../common';
import Redirect from 'react-router/Redirect';

class Show extends Component {
  state = { saved: false };

  componentWillMount() {
    this.props.fetchCar(this.props.params.id);
  }

  handleOnDelete(id) {
    event.preventDefault();
    this.props.deleteCar(id)
      .then((response) => {
        if (response.payload.status === 200) {
          return this.setState({ saved: true });
        }
      });
  }

  render() {
    if (this.state.saved) {
      return <Redirect to='/' />;
    }

    if (!this.props.car || (this.props.car && !this.props.car.maker)) {
      return <Loading />;
    }

    return (
      <div className='ui middle aligned stackable grid container'>
        <div className='row segment'>
          <div className='ui right aligned header show-edit-buttons'>
            <Link to={`/cars/edit/${this.props.car._id}`} className='ui primary basic button'>Edit</Link>
            <a href="#" className='ui negative basic button' onClick={this.handleOnDelete.bind(this, this.props.car._id)}>
              Delete
            </a>
          </div>
        </div>

        <div className='row'>
          <div className='four wide column'>
            <h3 className='ui header'>{this.props.car.name}</h3>
            <p>
              Maker: {this.props.car.maker.name} <br/>
              Year: {this.props.car.year}
            </p>

            <h3 className='ui header'>Price</h3>
            <p className='price'>R$ {this.props.car.price}</p>

            <h3 className='ui header'>Description</h3>
            <p>{this.props.car.details}</p>
          </div>

          <div className='ten wide right floated column' style={{ marginBottom: 15 }}>
            <img className='ui fluid bordered rounded image' src={this.props.car.photo} role='presentation' />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { car: state.cars.car };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCar, deleteCar }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Show);
