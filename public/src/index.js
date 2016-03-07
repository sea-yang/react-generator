import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import Root from './containers/Root';
import configureStore from './store/configureStore';

const initialState = JSON.parse(document.getElementById('initialState').innerHTML);
const store = configureStore(browserHistory, initialState);

render(
  <Root store={store} />,
  document.getElementById('root')
);
