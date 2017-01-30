import React, { Component, PropTypes  } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchCar, updateCar, uploadImage } from '../../actions/index';
import CarsForm from './form';

class Edit extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.fetchCar(this.props.params.id);
  }

  onSubmit(props) {
    this.handleUpdateCar(props);
  }

  onSubmitWithUpload(props) {
    this.handleUpdateImage(props);
  }

  handleUpdateImage(props) {
    this.props.uploadImage(props.photo[0])
      .then((event) => {
        props.photo = event.payload.downloadURL;
        this.handleUpdateCar(props);
      });
  }

  handleUpdateCar(props) {
    this.props.updateCar({...props, _id: this.props.params.id})
      .then(() => {
        this.context.router.push('/');
      });
  }

  render() {
    if (this.props.car) {
      this.props.car.maker = this.props.car.maker._id;
    }

    return (
      <div>
        <div className='ui container form-edit'>
          <h3>Create a New Car</h3>
          <CarsForm
            formSubmit={this.onSubmit.bind(this)}
            formSubmitWithUpload={this.onSubmitWithUpload.bind(this)}
            initialValues={this.props.car}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { car: state.cars.car };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCar, updateCar, uploadImage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
