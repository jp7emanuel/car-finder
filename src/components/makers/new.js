import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createMaker } from '../../actions/index';
import MakersForm from './form';

class New extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    this.props.createMaker(props)
      .then(() => {
        this.context.router.push('/makers');
      });
  }

  render() {
    return (
      <div className='ui container form-new'>
        <h3>Create a New Maker</h3>
        <MakersForm
          formSubmit={this.onSubmit.bind(this)}
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createMaker }, dispatch);
}

export default connect(null, mapDispatchToProps)(New);
