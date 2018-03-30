import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router';
import CssBaseline from 'material-ui/CssBaseline';
import HomeContainer, { PATH as HOME_PATH } from '../home';
import LoginContainer, { PATH as LOGIN_PATH } from '../login';

const PrivateRoute = connect(state => ({
  isAuthenticated: state.auth.isAuthenticated
}))(props => (
  <React.Fragment>
    <CssBaseline />
    {props.isAuthenticated ? (
      <props.component {...props} />
    ) : (
      <Redirect to={LOGIN_PATH} {...props} />
    )}
  </React.Fragment>
));

const App = props => (
  <Switch>
    <Route path={LOGIN_PATH} component={LoginContainer} />
    <PrivateRoute path={HOME_PATH} component={HomeContainer} />
  </Switch>
);

export default withRouter(App);
