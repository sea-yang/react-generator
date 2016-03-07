import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import toogle from './toogle';

const rootReducer = combineReducers({
  toogle,
  routing: routerReducer
});

export default rootReducer;
