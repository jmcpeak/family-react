import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

/*
 * Import the SDK and Project Configuration
 */
import AWS from 'aws-sdk';
import awsmobile from './aws-exports';

/*
 * Configure the SDK to use anonymous identity
 */
AWS.config.update({
  region: awsmobile.aws_cognito_region,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: awsmobile.aws_cognito_identity_pool_id
  })
});

/**
 * AWS - huh?
 * aws-config.js is used by browser sessions to configure the SDK.
 * aws-exports.js is used by SPA applications that are packed (by Webpack, Browserify, or similar tools) to configure the SDK.
 */

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
