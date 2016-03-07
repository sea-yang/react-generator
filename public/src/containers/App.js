import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AppView from '../components/AppView';
import * as ToogleActions from '../actions';

export const mapStateToProps = state => ({ value: state.toogle });

export const mapDispatchToProps = dispatch => (
  { actions: bindActionCreators(ToogleActions, dispatch) }
);

export default connect(mapStateToProps, mapDispatchToProps)(AppView);
