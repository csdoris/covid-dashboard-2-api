import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './utils/ScrollToTop';

import { Provider } from 'react-redux';
import { configureStore } from './store/configureStore';

import App from './App';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
          <ScrollToTop />
          <App />
        </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
