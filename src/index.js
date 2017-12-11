import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import getVisibleCandidates from './selectors/persons';
import { login, logout } from './actions/auth';
import { startSetCandidates } from './actions/persons';
import { firebase } from './firebase/firebase';

const store = configureStore();

store.subscribe(() => {
  const state = store.getState();
  const visibleCandidates = getVisibleCandidates(state.persons, state.filters);
  console.log(visibleCandidates, store.getState());
});

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(<Root />, document.getElementById('root'));
    hasRendered = true;
  }
};

const Root = () => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(<p>Loading...</p>, document.getElementById('root'));

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.info('user ', user.uid);
    store.dispatch(login(user.uid));
    store.dispatch(startSetCandidates()).then(() => {
      renderApp();
      if (history.location.pathname === '/') {
        history.push('/dashboard');
      }
    });
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});
registerServiceWorker();
