// Store Creation
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import candidatesReducer from '../reducers/persons';
import filterReducer from '../reducers/filters';
import authReducer from '../reducers/auth';
import paginationReducer from '../reducers/pagination';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default () => {
  const store = createStore(
    combineReducers({
      persons: candidatesReducer,
      filters: filterReducer,
      auth: authReducer,
      pagination: paginationReducer,
    }),
    composeEnhancers(applyMiddleware(thunk)),
    /* preloadedState, */
    // window.__REDUX_DEVTOOLS_EXTENSION__ &&
    //     window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
  return store;
};
