import React, { Component, PropTypes  } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CarsForm from './form';
import { carCreate, makersFetch } from '../../actions/index';

class New extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.makersFetch();
  }

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
            makers={this.props.makers}
            formSubmit={this.onSubmit.bind(this)}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { makers: state.makers.all };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ makersFetch, carCreate }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(New);
