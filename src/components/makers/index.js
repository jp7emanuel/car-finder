import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchMakers } from '../../actions/index';
import MakersList from './list';

class Index extends Component {
  componentWillMount() {
    this.props.fetchMakers();
  }

  render() {
    return (
      <div>
        <div className='ui container'>
          <MakersList makers={this.props.makers} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { makers: state.makers.all };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchMakers }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
