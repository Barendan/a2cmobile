import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import Application from 'application';

//redux-store
import store from './store';

const App = () => {

  return (
    <Provider store={store}>
      <Application />
    </Provider>
  )

};

export default App;
