import React from 'react';
import { Provider } from 'react-redux';
// import { Button } from 'react-toolbox/lib/button';
import Dashboard from './containers/Dashboard';
import store from './redux';

const App = () => (
  <Provider store={store}>
    <Dashboard />
    {/* <Button icon="bookmark" label="Bookmark" accent /> */}
  </Provider>
);

export default App;
