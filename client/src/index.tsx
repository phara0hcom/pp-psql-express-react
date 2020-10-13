import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Auth0Provider } from '@auth0/auth0-react';
import { composeWithDevTools } from 'redux-devtools-extension';

import './index.css';

import App from './App';
import rootReducer from './store/';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware()));
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Auth0Provider
        domain={`${process.env.REACT_APP_AUTH_DOMAIN}`}
        clientId={`${process.env.REACT_APP_AUTH_CLIENT_ID}`}
        redirectUri={`${window.location.origin}/callback`}
      >
        <App />
      </Auth0Provider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
