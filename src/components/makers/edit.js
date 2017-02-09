import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchMaker, updateMaker } from '../../actions/index';
import Redirect from 'react-router/Redirect';
import MakersForm from './form';

class Edit extends Component {
  state = { saved: false };

  componentWillMount() {
    this.props.fetchMaker(this.props.params.id);
  }

  onSubmit(props) {
    this.props.updateMaker({...props, _id: this.props.params.id}).then(() => {
      this.setState({ saved: true });
    });
  }

  render() {
    if (this.state.saved) {
      return <Redirect to="/makers" />;
    }

    return(
      <div className='ui container form-edit'>
        <MakersForm
          formSubmit={this.onSubmit.bind(this)}
          initialValues={this.props.maker}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { maker: state.makers.maker };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchMaker, updateMaker }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
