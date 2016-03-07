import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import routes from '../routes';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

export default class Root extends Component {
  render() {
    const { store } = this.props;
    const history = syncHistoryWithStore(browserHistory, store);
    if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__ && !window.devToolsExtension) {
      const DevTools = require('./DevTools').default;
      return (
        <Provider store={store}>
          <div>
            <Router history={history} routes={routes} />
            <DevTools />
          </div>
        </Provider>
      );
    }

    return (
      <Provider store={store}>
        <div>
          <Router history={history} routes={routes} />
        </div>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  App: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};
