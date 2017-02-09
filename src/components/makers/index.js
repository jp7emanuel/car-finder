import React, { Component } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchMakers, deleteMaker } from '../../actions/index';
import MakersList from './list';
import Redirect from 'react-router/Redirect';

class Index extends Component {
  state = { saved: false };

  componentWillMount() {
    this.props.fetchMakers();
  }

  componentDidUpdate() {
    if (this.state.saved) {
      this.props.fetchMakers();
      this.setState({ saved: false });
    }
  }

  onDelete(id) {
    this.props.deleteMaker(id)
      .then((response) => {
        this.setState({ saved: true });
      });
  }

  render() {
    return (
      <div>
        <div className='ui container'>
          <div className='ui right aligned header' style={{ marginTop: 10 }}>
            <Link to='/makers/new' className='ui green basic button'>
              New Maker
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
