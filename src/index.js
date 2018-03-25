import React from 'react';
import throttle from 'lodash/throttle';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store';
import App from './containers/app';
import registerServiceWorker from './registerServiceWorker';
import { saveState } from './constants/localStorage';
import { initialState as layoutInitialState } from './reducers/layout';
import { initialState as dataInitialState } from './reducers/data';
import AWS from 'aws-sdk';
import awsmobile from './aws-exports';
import Amplify, { Analytics } from 'aws-amplify';
import aws_exports from './aws-exports';
import 'sanitize.css/sanitize.css';
import './index.css';

Amplify.configure(aws_exports);
Analytics.record('myCustomEvent');

/**
 * AWS - huh?
 * aws-config.js is used by browser sessions to configure the SDK.
 * aws-exports.js is used by SPA applications that are packed (by Webpack) to configure the SDK.
 */

/**
 * Configure the SDK to use anonymous identity
 */
AWS.config.update({
  region: awsmobile.aws_cognito_region,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: awsmobile.aws_cognito_identity_pool_id
  })
});

/**
 * Subscribe to all store events
 * Only every 1.5 seconds are they stored in localStorage
 */
store.subscribe(
  throttle(() => {
    saveState({
      auth: store.getState().auth,
      data: {
        ...dataInitialState,
        user: store.getState().data.user
      },
      layout: {
        ...layoutInitialState,
        drawerOpen: store.getState().layout.drawerOpen
      },
      theme: store.getState().theme
    });
  }, 1500)
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
