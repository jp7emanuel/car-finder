import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Redirect from 'react-router/Redirect';
import { createMaker } from '../../actions/index';
import MakersForm from './form';

class New extends Component {
  state = { saved: false };

  onSubmit(props) {
    this.props.createMaker(props)
      .then((response) => {
        this.setState({ saved: true });
      });
  }

  render() {
    if (this.state.saved) {
      return <Redirect to="/makers" />;
    }

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
