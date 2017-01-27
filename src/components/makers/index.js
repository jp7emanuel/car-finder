import React, { Component } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchMakers, deleteMaker } from '../../actions/index';
import MakersList from './list';

class Index extends Component {
  componentWillMount() {
    this.props.fetchMakers();
  }

  onDelete(id) {
    this.props.deleteMaker(id);
  }

  render() {
    return (
      <div>
        <div className='ui container'>
          <div className='ui right aligned header' style={{ marginTop: 10 }}>
            <Link to='/makers/new' className='ui green basic button'>
              New Car
            </Link>
          </div>

          <MakersList
            makers={this.props.makers}
            onDelete={this.onDelete.bind(this)}
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
  return bindActionCreators({ fetchMakers, deleteMaker }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
