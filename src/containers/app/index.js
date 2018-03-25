import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import HomeContainer, { HOME_PATH } from '../home';
import LoginContainer, { LOGIN_PATH } from '../login';
import MemberContainer, { MEMBER_PATH } from '../member';
import { login } from '../../actions/auth';

const PrivateRoute = connect(state => ({
  isAuthenticated: state.auth.isAuthenticated
}))(
  props =>
    props.isAuthenticated ? <props.component /> : <Redirect to={LOGIN_PATH} />
);

const Section = props => (
  <Switch>
    <Route
      path={LOGIN_PATH}
      render={() => <LoginContainer onSubmit={props.login} />}
    />
    <PrivateRoute path={HOME_PATH} component={HomeContainer} />
    <PrivateRoute path={MEMBER_PATH} component={MemberContainer} />
  </Switch>
);

const mapStateToProps = state => ({
  something: state.something
});

const mapDispatchToProps = dispatch => ({
  login: () => dispatch(login())
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Section)
);
