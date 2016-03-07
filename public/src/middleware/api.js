import fetch from 'isomorphic-fetch';

// API Middleware
// Performs the remote call when such actions are dispatched.
export default store => next => action => {
  return next(action);
}
