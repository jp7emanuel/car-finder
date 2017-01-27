import React, { Component, PropTypes  } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { carCreate } from '../../actions/index';
import CarsForm from './form';

class New extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    this.props.carCreate(props);
    return this.context.router.push('/');
  }

  render() {
    return (
      <div>
        <div className='ui container form-new'>
          <h3>Create a New Car</h3>
          <CarsForm
            formSubmit={this.onSubmit.bind(this)}
          />
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ carCreate }, dispatch);
}

export default connect(null, mapDispatchToProps)(New);
