import React from 'react';
import { Provider } from 'react-redux';
import Dashboard from './containers/Dashboard';
import store from './redux';

const App = () => (
  <Provider store={store}>
    <Dashboard />
  </Provider>
);

export default App;
