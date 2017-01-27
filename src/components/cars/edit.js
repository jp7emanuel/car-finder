import React, { Component, PropTypes  } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CarsForm from './form';
import { carFetch, makersFetch, carUpdate } from '../../actions/index';



class Edit extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.carFetch(this.props.params.id);
    this.props.makersFetch();
  }


  onSubmit(props) {
    this.props.carUpdate({...props, _id: this.props.params.id});
    return this.context.router.push('/');
  }

  render() {
    var car = null;
    if (this.props.car) {
      car = {
        name: this.props.car.name,
        maker: this.props.car.maker._id
      }
    }

    return (
      <div>
        <div className='ui container form-new'>
          <h3>Create a New Car</h3>
          <CarsForm
            makers={this.props.makers}
            formSubmit={this.onSubmit.bind(this)}
            initialValues={car}
            makers={this.props.makers}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { car: state.cars.car, makers: state.makers.all };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ carFetch, makersFetch, carUpdate }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
