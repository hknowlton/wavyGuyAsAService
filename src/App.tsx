import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { Home } from './screens/Home';

function App() {
  return (
    <Router history={createBrowserHistory()}>
      <Home />
    </Router>
  );
}

export default App;
