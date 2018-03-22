import React from 'react';
import throttle from 'lodash/throttle';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store';
import App from './containers/app';
import registerServiceWorker from './registerServiceWorker';
import { saveState } from './localStorage';
import { initialState as layoutInitialState } from './modules/layoutReducer';
import 'sanitize.css/sanitize.css';
import './index.css';
import AWS from 'aws-sdk';
import awsmobile from './aws-exports';

/**
 * AWS - huh?
 * aws-config.js is used by browser sessions to configure the SDK.
 * aws-exports.js is used by SPA applications that are packed (by Webpack, Browserify, or similar tools) to configure the SDK.
 */

/*
 * Configure the SDK to use anonymous identity
 */
AWS.config.update({
  region: awsmobile.aws_cognito_region,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: awsmobile.aws_cognito_identity_pool_id
  })
});

store.subscribe(
  throttle(() => {
    saveState({
      authorization: store.getState().authorization,
      theme: store.getState().theme,
      layout: {
        ...layoutInitialState,
        drawerOpen: store.getState().layout.drawerOpen
      }
    });
  }, 1000)
);

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.querySelector('#root')
);

registerServiceWorker();
