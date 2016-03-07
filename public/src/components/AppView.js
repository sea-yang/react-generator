import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Toogle from '../components/Toogle';
import '../common/css/main.css';

export default class AppView extends Component {
  render() {
    const { value, actions } = this.props;
    return (
      <div>
        <Toogle value={`${value}`} onToogle={actions.toogle} />
        <br />
        test link:
        <Link to="/test">test</Link>
      </div>
    );
  }
}

AppView.propTypes = {
  value: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired
};
