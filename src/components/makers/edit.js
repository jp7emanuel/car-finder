import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchMaker, updateMaker } from '../../actions/index';
import MakersForm from './form';

class Edit extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.fetchMaker(this.props.params.id);
  }

  onSubmit(props) {
    this.props.updateMaker({...props, _id: this.props.params.id});
    return this.context.router.push('/makers');
  }

  render() {
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
