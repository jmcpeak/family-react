import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { history, persistor } from './store';
import ScreenRoot from './screens/Root';
import registerServiceWorker from './registerServiceWorker';
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

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <ScreenRoot />
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.querySelector('#root')
);

registerServiceWorker();
